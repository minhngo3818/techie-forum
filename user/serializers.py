from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Profile


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["id"] = str(
            user.id
        )  # uuid has it own type, must convert to str in order for json serializing

        return token


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        # NOTES: non-exist field will result hyperlinked relationship error
        fields = ["id", "username", "email", "first_name", "last_name"]


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        max_length=100,
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    """
        Read-only tokens field
        Use for adding a custom function to return 
        tokens pair in UserRegister createAPIView
    """
    tokens = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["email", "username", "password", "password2", "tokens"]

    def validate(self, attrs):
        # Validate username
        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError(
                {"username": "This username is already existed!"}
            )
        # Validate email
        if User.objects.filter(username=attrs["email"]).exists():
            raise serializers.ValidationError(
                {"email": "This email is already existed!"}
            )
        # Check matching password
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Password didn't match!"})

        # add all fields to create an instance
        return attrs

    """
        Return a token pair in response when calling serializer
    """

    def get_tokens(self, user):
        token = RefreshToken.for_user(user=user)
        refresh = str(token)
        access = str(token.access_token)
        return {"refresh": refresh, "access": access}

    def create(self, validate_data):
        user = User.objects.create_user(
            username=validate_data["username"],
            email=validate_data["email"],
        )

        user.set_password(validate_data["password"])
        user.save()

        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    new_password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if not self.context["request"].user.check_password(attrs["old_password"]):
            raise serializers.ValidationError(
                {"old_password": "Your input old password is incorrect"}
            )

        if attrs["new_password"] != attrs["new_password2"]:
            raise serializers.ValidationError(
                {"new_password": "New password did not match"}
            )

        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data["new_password"])
        instance.save()
        return instance


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "url",
            "display_name",
            "bio",
            "avatar",
            "twitter_url",
            "reddit_url",
            "github_url",
            "stackoverflow_url",
            "linkedin_url",
            "indeed_url",
        ]
