from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.validators import validate_email
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.conf import settings
from django.db import transaction
from django.db.models import Q
import json
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer,
    TokenVerifySerializer,
)
from rest_framework_simplejwt.exceptions import InvalidToken
from utils.dynamic_field_serializer import DynamicFieldsModelSerializer
from .models import User, Profile, Project
from forum.models import Thread, Comment, BasePost


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serialize project information and its owner
    """

    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for viewing user information
    """

    class Meta:
        model = User
        fields = ["id", "username", "email", "is_active"]


class ProfileSerializer(DynamicFieldsModelSerializer):
    """
    Serialize all related information of user profile
    """

    projects = ProjectSerializer(many=True, required=False)
    thread_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = [
            "id",
            "profile_name",
            "about",
            "avatar",
            "twitter",
            "reddit",
            "github",
            "stackoverflow",
            "linkedin",
            "projects",
            "thread_count",
            "comment_count",
            "like_count",
        ]

    @classmethod
    def get_thread_count(cls, profile):
        return Thread.objects.filter(author=profile.id).count()

    @classmethod
    def get_comment_count(cls, profile):
        return Comment.objects.filter(author=profile.id).count()

    @classmethod
    def get_like_count(cls, profile):
        count = (
            BasePost.objects.filter(author=profile.id)
            .values("liked")
            .exclude(liked__isnull=True)
            .count()
        )
        return count

    def to_internal_value(self, data):

        # parse projects string into array of project
        projects_list = []
        if "projects" in data:
            try:
                projects_list = json.loads(data["projects"])
            except json.JSONDecodeError:
                # Handle invalid JSON input
                raise serializers.ValidationError("Invalid JSON for projects")

        new_data = {key: value for key, value in data.items() if key != "projects"}
        new_data["projects"] = projects_list

        return new_data

    def validate(self, attrs):
        print("validate: ", attrs)
        return super().validate(attrs)

    def create(self, validated_data):
        projects = validated_data.pop("projects", None)

        profile_inst = Profile.objects.create(**validated_data)

        if projects:
            with transaction.atomic():
                project_inst = ProjectSerializer(data=projects, many=True)
                project_inst.is_valid(raise_exception=True)
                project_inst.save(owner=profile_inst)

        return profile_inst

    def to_representation(self, instance):
        data = super().to_representation(instance)
        projects = Project.objects.filter(owner=instance.id).values()
        projects_to_represent = []

        for project in projects:
            project.pop("owner_id")
            project.pop("created_at")
            project.pop("updated_at")
            projects_to_represent.append(project)

        data["projects"] = projects_to_represent

        return data


class RegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration, return form input with auth tokens
    """

    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        min_length=8,
        max_length=255,
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)
    tokens = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["email", "username", "password", "password2", "tokens"]

    def validate(self, attrs):
        errors = {}

        if User.objects.filter(username=attrs["username"]).exists():
            errors["username"] = "Username is already existed!"

        if User.objects.filter(username=attrs["email"]).exists():
            errors["email"] = "email is already existed!"

        if not attrs["username"].isalnum():
            errors["username"] = "username cannot have special characters"

        if attrs["password"] != attrs["password2"]:
            errors["password"] = "password didn't match!"

        if errors:
            raise serializers.ValidationError(errors)

        # add all fields to create an instance
        return super().validate(attrs)

    @classmethod
    def get_tokens(cls, user):
        # Return generated tokens after successful registering account

        token = RefreshToken.for_user(user=user)
        refresh = str(token)
        access = str(token.access_token)
        return {"refresh": refresh, "access": access}

    def create(self, validated_data):
        user = User(email=validated_data["email"], username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class LoginSerializer(serializers.ModelSerializer):
    """
    Serializer for login. Retrieve auth tokens and user information
    """

    username = serializers.CharField(max_length=255, required=True)
    password = serializers.CharField(max_length=128, write_only=True, required=True)
    email = serializers.EmailField(read_only=True)
    profile_name = serializers.CharField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    is_verified = serializers.BooleanField(read_only=True)
    tokens = serializers.DictField(child=serializers.CharField(), read_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "profile_name",
            "email",
            "is_active",
            "is_verified",
            "password",
            "tokens",
        ]

    def validate(self, attrs):
        # Validate login input and return user object if succeed

        username = attrs["username"]
        password = attrs["password"]
        user = authenticate(username=username, password=password)

        if username is None:
            raise AuthenticationFailed({"username": "Username is required"})

        if password is None:
            raise AuthenticationFailed({"password": "Password is required"})

        self.instance = User.objects.get(username=attrs["username"])

        if self.instance is None:
            raise AuthenticationFailed("User does not exist or incorrect login inputs")

        return super().validate(attrs)

    def to_representation(self, instance):
        tokens = instance.get_tokens
        profile_name = (
            Profile.objects.get(owner=instance.id).profile_name
            if Profile.objects.filter(owner=instance.id).exists()
            else None
        )

        return {
            "username": instance.username,
            "profile_name": profile_name,
            "email": instance.email,
            "is_active": instance.is_active,
            "is_verified": instance.is_verified,
            "tokens": tokens,
        }


class LogoutSerializer(serializers.Serializer):
    """
    Serializer for log-out
    """

    refresh = serializers.CharField()

    default_error_messages = {"bad_token": "Token is invalid or expired."}

    def __init__(self, instance=None, **kwargs):
        super().__init__(instance, kwargs)
        self.token = None

    def to_internal_value(self, data):
        return data

    def validate(self, attrs):
        self.token = attrs.get(settings.COOKIES["AUTH_COOKIE_REFRESH"])
        return attrs

    def save(self):
        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail("bad_token")


class EmailVerificationSerializer(serializers.ModelSerializer):
    """
    Serializer to verify user email by send a notification
    """

    token = serializers.CharField(max_length=600)

    class Meta:
        model = User
        fields = ["token"]


class ChangeEmailSerializer(serializers.ModelSerializer):

    email = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["email", "is_verified"]

    def validate(self, attrs):
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({"email": "already existed"})

        validate_email(attrs["email"])

        return attrs

    def update(self, instance, validated_data):
        instance.email = validated_data["email"]
        instance.is_verified = False
        instance.save()
        return instance


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid refresh token found in cookies")


class CookieTokenVerifySerializer(TokenVerifySerializer):
    def validate(self, attrs):
        if attrs["token"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid  token found in cookies")


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer to change password while user is authenticated
    """

    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    new_password2 = serializers.CharField(write_only=True, required=True)

    def to_internal_value(self, data):
        return {
            "old_password": data["old_password"],
            "new_password": data["password"],
            "new_password2": data["password2"],
        }

    def validate(self, attrs):
        errors = {}
        user = self.context["request"].user

        # Note: make sure db is consistent during development
        #       abruptly change user instance causing fail test
        if not user.check_password(attrs["old_password"]):
            errors["old_password"] = "old password is incorrect"

        if attrs["new_password"] != attrs["new_password2"]:
            errors["new_password"] = "new password did not match"

        if errors:
            raise serializers.ValidationError(errors)

        return super().validate(attrs)

    def save(self):
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user


class RequestResetPasswordSerializer(serializers.Serializer):
    """
    Serializer to send reset password request to user email
    """

    email = serializers.EmailField(min_length=8, required=True)

    # Frontend send user email along with reset password route
    redirect_url = serializers.CharField(max_length=500, required=False)

    def validate(self, attrs):
        if not User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({"email": "email does not exist"})

        return attrs


class ResetPasswordSerializer(serializers.Serializer):
    """
    Serializer to reset password with via attached link
    """

    password = serializers.CharField(
        min_length=8, max_length=255, write_only=True, required=True
    )
    password2 = serializers.CharField(
        min_length=8, max_length=255, write_only=True, required=True
    )
    token = serializers.CharField(min_length=8, max_length=255)
    uidb64 = serializers.CharField(min_length=8)

    class Meta:
        fields = ["password", "password2", "token", "uidb64"]

    def validate(self, attrs):
        # Validate two password fields and
        # decode reset password url uidb64 into id to verify user

        password = attrs["password"]
        password2 = attrs["password2"]
        token = attrs["token"]
        uidb64 = attrs["uidb64"]

        user_id = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(id=user_id)

        if password != password2:
            raise serializers.ValidationError(
                {"password": "new password did not match"}
            )

        if not PasswordResetTokenGenerator().check_token(user, token):
            raise AuthenticationFailed("Reset password url is invalid", 401)

        user.set_password(password)
        user.save()

        return super().validate(attrs)
