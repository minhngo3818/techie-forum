from django.utils import timezone
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, smart_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404
from django.http import HttpResponsePermanentRedirect
from django.middleware import csrf
from django.shortcuts import reverse
from .authenticate import enforce_csrf
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from rest_framework.generics import (
    GenericAPIView,
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView,
)
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .email import EmailSender
from .models import User, DeletedUser, Profile, Project
from .serializers import (
    UserSerializer,
    RegistrationSerializer,
    LoginSerializer,
    LogoutSerializer,
    CookieTokenRefreshSerializer,
    CookieTokenVerifySerializer,
    EmailVerificationSerializer,
    ChangeEmailSerializer,
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
    def __init__(
        self, target_url, verify_domain=True, verify_scheme=True, *args, **kwargs
    ):
        super().__init__(target_url, *args, **kwargs)
        self.verify_domains = verify_domain
        self.verify_schemes = verify_scheme

    def handle_redirect(self, request):
        if self.verify_domain:
            valid_domains = settings.ALLOWED_HOSTS
            if request.get_host() not in valid_domains:
                raise ValueError("Invalid domain")

        if self.verify_schemes:
            valid_schemes = "https" if not settings.DEBUG else "http"
            if request.scheme not in valid_schemes:
                raise ValueError("Invalid scheme")

        return super().handle_redirect(request)


class UserViewSet(ReadOnlyModelViewSet):
    """
    Provide ready-only api view user information for admin
    """

    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegisterView(GenericAPIView):
    """
    Fetch to create user account
    Send a follow-up email verification
    """

    queryset = User.objects.all()
    serializer_class = RegistrationSerializer

    def post(self, request, *args, **kwargs):
        enforce_csrf(request)  # Check cross site token
        user_input = request.data
        serializer = self.serializer_class(data=user_input)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = User.objects.get(email=serializer.data["email"])
        token = RefreshToken.for_user(user)
        frontend_url = settings.MAIN_CLIENT_ORIGIN
        data = EmailSender.compose_verification_email(frontend_url, user, token)
        EmailSender.send_email(data)

        return Response(
            {
                "username": serializer.data["username"],
                "email": serializer.data["email"],
            },
            status=status.HTTP_201_CREATED,
        )


class RequestEmailVerificationView(GenericAPIView):

    queryset = User.objects.all()

    @classmethod
    def get(cls, request, udsf):
        username = smart_str(urlsafe_base64_decode(udsf))
        user = User.objects.get(username=username)
        tokens = user.get_tokens
        data = EmailSender.compose_verification_email(
            settings.MAIN_CLIENT_ORIGIN,
            user,
            tokens["access"],
        )
        EmailSender.send_email(data)

        return Response(status=status.HTTP_200_OK)


class EmailVerificationView(GenericAPIView):
    """
    Fetch to send email verification for new user
    """

    serializer_class = EmailVerificationSerializer

    @classmethod
    def get(cls, request):
        token = request.GET.get("token", "")
        try:
            payload = jwt.decode(
                jwt=token, key=settings.SECRET_KEY, algorithms=["HS256"]
            )
            user = User.objects.get(id=payload["user_id"])
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response(
                    {"message": "Email was verified successfully"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"message": "Email was verified long ago"},
                    status=status.HTTP_200_OK,
                )

        except jwt.ExpiredSignatureError:
            return Response(
                {"error": "Email verification token was expired"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except jwt.exceptions.DecodeError:
            return Response(
                {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            )


class ChangeEmailView(UpdateAPIView):
    """
    Fetch to update user email. Send an email verification
    """

    queryset = User.objects.all()
    serializer_class = ChangeEmailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = get_object_or_404(self.queryset, **{"id": self.request.user.id})
        return obj

    def perform_update(self, serializer):
        user = self.get_object()
        serializer.save()
        tokens = user.get_tokens
        data = EmailSender.compose_verification_email(
            settings.MAIN_CLIENT_ORIGIN,
            user,
            tokens["access"],
        )
        EmailSender.send_email(data)


class CsrfTokenView(APIView):
    """
    Fetch to get csrf token before perform
    requests that change in the database
    """

    def get(self, request):
        csrf_token = csrf.get_token(request)
        response = Response(status=status.HTTP_200_OK, data={"csrftoken": csrf_token})
        return response


class LoginView(GenericAPIView):
    """
    Fetch to allow user login. Set auth tokens in cookie on success
    Response with account status if it is not active
    Send an email verification if user has not verified email
    """

    queryset = User.objects.all()
    serializer_class = LoginSerializer

    def post(self, request):
        enforce_csrf(request)  # Check cross-site token
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        if not serializer.data["is_active"]:
            return Response(
                status=status.HTTP_200_OK,
                data={"username": serializer.data["username"], "is_active": False},
            )

        if not serializer.data["is_verified"]:
            data = EmailSender.compose_verification_email(
                settings.MAIN_CLIENT_ORIGIN,
                serializer.instance,
                serializer.data["tokens"]["access"],
            )
            EmailSender.send_email(data)

            return Response(
                status=status.HTTP_200_OK,
                data={
                    "is_verified": False,
                    "udsf": urlsafe_base64_encode(
                        smart_bytes(serializer.data["username"])
                    ),
                },
            )

        response = Response(
            data=serializer.data,
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            value=serializer.data.get("tokens").get("access"),
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            key=settings.COOKIES["AUTH_COOKIE"],
            secure=settings.COOKIES["AUTH_COOKIE_SECURE"],
            path=settings.COOKIES["AUTH_COOKIE_PATH"],
            httponly=settings.COOKIES["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.COOKIES["AUTH_COOKIE_SAMESITE"],
        )
        response.set_cookie(
            value=serializer.data.get("tokens").get("refresh"),
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            key=settings.COOKIES["AUTH_COOKIE_REFRESH"],
            secure=settings.COOKIES["AUTH_COOKIE_SECURE"],
            path=settings.COOKIES["AUTH_COOKIE_PATH"],
            httponly=settings.COOKIES["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.COOKIES["AUTH_COOKIE_SAMESITE"],
        )
        return response


class LogoutView(CreateAPIView):
    """
    Fetch to log out user and blacklist current refresh token
    """

    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer

    def post(self, request, *args, **kwargs):
        enforce_csrf(request)
        refresh = request.COOKIES.get(settings.COOKIES["AUTH_COOKIE_REFRESH"])
        if refresh:
            serializer = self.serializer_class(data={"refresh": refresh})
            serializer.is_valid(raise_exception=True)
            serializer.save()

        response = Response(
            status=status.HTTP_200_OK, data={"success": "You have logged out!"}
        )
        response.delete_cookie(settings.COOKIES["AUTH_COOKIE"])
        response.delete_cookie(settings.COOKIES["AUTH_COOKIE_REFRESH"])
        response.delete_cookie("csrftoken")
        return response


class CookieTokenRefreshView(TokenRefreshView):
    """
    Generate new token pair and set them in cookies
    """

    serializer_class = CookieTokenRefreshSerializer
    permission_class = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get(settings.COOKIES["AUTH_COOKIE_REFRESH"])
        serializer = self.serializer_class(data={"refresh": refresh})

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as error:
            return Response(
                status=status.HTTP_400_BAD_REQUEST, data={"error": error.args[0]}
            )

        response = Response(
            status=status.HTTP_200_OK,
            data={"message": "token was refreshed successfully!"},
        )
        response.set_cookie(
            value=serializer.data.get("refresh"),
            expires=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
            key=settings.COOKIES["AUTH_COOKIE_REFRESH"],
            secure=settings.COOKIES["AUTH_COOKIE_SECURE"],
            path=settings.COOKIES["AUTH_COOKIE_PATH"],
            httponly=settings.COOKIES["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.COOKIES["AUTH_COOKIE_SAMESITE"],
        )

        response.set_cookie(
            value=serializer.data.get("access"),
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            key=settings.COOKIES["AUTH_COOKIE"],
            secure=settings.COOKIES["AUTH_COOKIE_SECURE"],
            path=settings.COOKIES["AUTH_COOKIE_PATH"],
            httponly=settings.COOKIES["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.COOKIES["AUTH_COOKIE_SAMESITE"],
        )

        return response


class CookieTokenVerifyView(TokenVerifyView):
    """
    Verify access token
    """

    serializer_class = CookieTokenVerifySerializer
    permission_class = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get(settings.COOKIES["AUTH_COOKIE"])
        serializer = self.serializer_class(data={"token": token})

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as error:
            return Response(
                status=status.HTTP_400_BAD_REQUEST, data={"error": error.args[0]}
            )

        return Response(
            status=status.HTTP_200_OK,
            data={"message": "Access was verified successfully"},
        )


class ChangePasswordView(UpdateAPIView):
    """
    Fetch to update user password
    """

    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = get_object_or_404(self.queryset, **{"id": self.request.user.id})
        return obj

    def update(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        refresh = RefreshToken.for_user(request.user)
        response = Response(
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            value=str(refresh.access_token),
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            key=settings.COOKIES["AUTH_COOKIE"],
            secure=settings.COOKIES["AUTH_COOKIE_SECURE"],
            path=settings.COOKIES["AUTH_COOKIE_PATH"],
            httponly=settings.COOKIES["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.COOKIES["AUTH_COOKIE_SAMESITE"],
        )
        response.set_cookie(
            value=str(refresh),
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            key=settings.COOKIES["AUTH_COOKIE_REFRESH"],
            secure=settings.COOKIES["AUTH_COOKIE_SECURE"],
            path=settings.COOKIES["AUTH_COOKIE_PATH"],
            httponly=settings.COOKIES["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.COOKIES["AUTH_COOKIE_SAMESITE"],
        )
        return response


class RequestResetPasswordView(GenericAPIView):
    """
    Fetch to post user email for sending reset password request
    """

    serializer_class = RequestResetPasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(email=serializer.data["email"])

        # Encoded credentials
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)

        scheme = request.scheme
        domain = get_current_site(request=request).domain
        path = reverse("password-reset-confirm", kwargs={"id": uidb64, "token": token})
        redirect_url = "?redirect_url=" + request.data.get("redirect_url", "")
        reset_password_url = scheme + "://" + domain + path + redirect_url
        data = EmailSender.compose_reset_password_notice(user, reset_password_url)
        EmailSender.send_email(data)

        return Response(
            data={
                "message": "A reset password link was sent your email.",
                "url": reset_password_url,
            },
            status=status.HTTP_200_OK,
        )


class ConfirmResetPasswordUrlView(GenericAPIView):
    """
    Fetch to verify uidb64 and token before redirect to reset password page
    """

    @classmethod
    def get(cls, request, id, token):
        redirect_url = request.GET.get("redirect_url")

        try:
            user_id = smart_str(urlsafe_base64_decode(id))
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return CustomRedirect(redirect_url + "?token_valid=False")

            return CustomRedirect(redirect_url + "/" + id + "/" + token)

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
        enforce_csrf(request)
        user_id = smart_str(urlsafe_base64_decode(request.data.get("id")))
        data = request.data.copy()
        data["id"] = user_id
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            data={"message": "Password was reset successfully!"},
            status=status.HTTP_200_OK,
        )


class DeleteAccountView(CreateAPIView):
    """
    Request to delete account temporarily by setting user non-active
    """

    queryset = User.objects.all()
    permission_group = [IsAuthenticated]

    def post(self, request):
        user = User.objects.get(id=request.user.id)
        user.is_active = False
        user.save()
        DeletedUser.objects.create(user=user)

        # Send delete notification
        data = EmailSender.compose_delete_account_notice(user)
        EmailSender.send_email(data)

        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie(settings.COOKIES["AUTH_COOKIE"])
        response.delete_cookie(settings.COOKIES["AUTH_COOKIE_REFRESH"])
        response.delete_cookie("csrftoken")

        return response


class ProfileViewSet(ModelViewSet):
    """
    Fetch database to read, create, update, and delete profile
    """

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "profile_name"

    def create(self, request, *args, **kwargs):
        converted_data = request.data.copy()

        # Check if profile name is None
        profile_name = request.data.get("profile_name", None)
        if profile_name is None:
            converted_data["profile_name"] = request.user.username

        serializer = self.serializer_class(data=converted_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now(), owner=self.request.user)


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
        profile = Profile.objects.get(owner=self.request.user.id)
        serializer.save(updated_date=timezone.now(), owner=profile)
