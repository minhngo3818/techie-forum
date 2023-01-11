from django.utils import timezone
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, smart_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.http import HttpResponsePermanentRedirect
from rest_framework import status
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from rest_framework.generics import GenericAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import (
    RefreshToken,
    TokenError,
)
from .email import EmailSender
from .models import User, Profile, Project
from .serializers import (
    UserSerializer,
    RegistrationSerializer,
    LoginSerializer,
    EmailVerificationSerializer,
    ChangePasswordSerializer,
    RequestResetPasswordSerializer,
    ResetPasswordSerializer,
    ProfileSerializer,
    ProjectSerializer,
)
from django.conf import settings
import jwt
import os


class CustomRedirect(HttpResponsePermanentRedirect):
    allowed_schemes = [os.environ.get("APP_SCHEMES")]


class UserViewSet(ReadOnlyModelViewSet):
    """
    Provide ready-only api view user information for admin
    """

    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegisterView(CreateAPIView):
    """
    Fetch to create user and add to database
    Response with jwt token pair
    """

    queryset = User.objects.all()
    serializer_class = RegistrationSerializer

    def post(self, request, *args, **kwargs):
        user_input = request.data
        serializer = self.serializer_class(data=user_input)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user = User.objects.get(email=serializer.data["email"])
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        path = reverse("email-verification")
        email_verification_url = (
            "http://" + current_site + path + "?token=" + str(token)
        )

        email_subject = "Email Verification"
        email_body = (
            "Welcome {} to our lair, \n\n".format(user.username)
            + "Just one more step. Access the link below to verify your email:\n\n"
            + email_verification_url + "\n\n"
            + "Best,\n"
            + "The Techies Forum Team"
        )

        data = {
            "email_subject": email_subject,
            "email_body": email_body,
            "to_email": user.email,
        }

        EmailSender.send_email(data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EmailVerificationView(GenericAPIView):
    """
    Fetch to send email verification for new user
    """

    serializer_class = EmailVerificationSerializer

    @classmethod
    def get(cls, request):
        token = request.GET.get("token", "")
        try:
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=["HS256"])
            print(payload)
            user = User.objects.get(id=payload["user_id"])
            if not user.is_verified:
                user.is_verified = True
                user.save()
                redirect_url = str(os.environ.get("FRONTEND_URL")) + "?email_verify=True"
                return CustomRedirect(redirect_url)
            else:
                return Response({"message": "Email was verified"})

        except jwt.ExpiredSignatureError:
            return Response(
                {"error": "Email verification token was expired"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except jwt.exceptions.DecodeError:
            return Response(
                {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            )


class LoginView(GenericAPIView):
    """
    Fetch to allow user login
    """

    queryset = User.objects.all()
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutView(CreateAPIView):
    """
    Fetch to log out user and blacklist current refresh token
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh = request.data.get("refresh")
            token = RefreshToken(refresh)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)

        except TokenError:
            return Response(
                data={"message": "Failed to blacklist token"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ChangePasswordView(UpdateAPIView):
    """
    Fetch to update user password
    """

    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]


class RequestResetPasswordView(GenericAPIView):
    """
    Fetch to post user email for sending reset password request
    """

    serializer_class = RequestResetPasswordSerializer

    @classmethod
    def post(cls, request):
        email = request.data.get("email")

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)

            # Encode path
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)

            # Server domain
            current_site = get_current_site(request=request).domain

            # Path to reset
            path = reverse(
                "password-reset-confirm", kwargs={"uidb64": uidb64, "token": token}
            )

            # Reset password url
            redirect_url = "?redirect_url=" + request.data.get("redirect_url", "")
            server_url = "http://" + current_site + path
            reset_password_url = server_url + redirect_url

            email_subject = "Reset your Techies Forum password"
            email_body = (
                "Hi {}, \n\n".format(user.username)
                + "We have received a request to reset password for your Techies Forum account.\n"
                + "Click to the link below to set a new password: \n\n"
                + reset_password_url
                + "\n\n"
                + "If you did not send this request, please contact us at support@techiesforum.com\n\n"
                + "Best,\n"
                + "The Techie Forum Team"
            )

            data = {
                "email_subject": email_subject,
                "email_body": email_body,
                "to_email": user.email,
            }

            EmailSender.send_email(data)

            return Response(
                {
                    "success": True,
                    "message": "A reset password link was sent your email.",
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"error": "Account does not exist"}, status=status.HTTP_404_NOT_FOUND
        )


class ConfirmResetPasswordUrlView(GenericAPIView):
    """
    Fetch to verify uidb64 and token before redirect to reset password page
    """

    serializer_class = ResetPasswordSerializer

    @classmethod
    def get(cls, request, uidb64, token):
        redirect_url = request.GET.get("redirect_url", "")

        try:
            user_id = smart_str(
                urlsafe_base64_decode(uidb64)
            )  # may throw DjangoUnicodeDecodeError
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                if len(redirect_url) > 40:
                    return CustomRedirect(redirect_url + "?token_valid=False")
                else:
                    return CustomRedirect(
                        os.environ.get("FRONTEND_URL") + "?token_valid=False"
                    )

            if len(redirect_url) > 40:
                return CustomRedirect(
                    redirect_url
                    + "?token_valid=True"
                    + "&uidb64="
                    + uidb64
                    + "&token="
                    + token
                )
            else:
                return CustomRedirect(os.environ.get("FRONTEND_URL"))

        except DjangoUnicodeDecodeError:
            return CustomRedirect(redirect_url + "?token_valid=False")

        except UnboundLocalError:
            return Response(
                {"error": "Token is not valid, please request a new one"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ResetPasswordView(UpdateAPIView):
    """
    Fetch to reset password after verifying encoded url
    """

    serializer_class = ResetPasswordSerializer

    def patch(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            data={"success": True, "message": "Password was reset successfully!"},
            status=status.HTTP_200_OK,
        )


class ProfileViewSet(ModelViewSet):
    """
    Fetch database to read, create, update, and delete profile
    """

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "owner"

    def perform_update(self, serializer):
        serializer.save(updated_date=timezone.now(), owner=self.request.user)


class ProjectViewSet(ModelViewSet):
    """
    Fetch database to read, create, update, and delete project
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        profile = Profile.objects.get(owner=self.request.user.id)
        serializer.save(owner=profile)

    def perform_update(self, serializer):
        serializer(updated_date=timezone.now(), owner=self.request.user)
