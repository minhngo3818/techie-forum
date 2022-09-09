from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User, Profile


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['id'] = str(user.id)  # uuid has it own type, must convert to str in order for json serializing

        return token


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        # NOTES: non-exist field will result hyperlinked relationship error
        fields = ["id","username", "email", "first_name", "last_name"]


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        max_length=100,
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["email", "username", "password", "password2"]

    def validate(self, attrs):
        # Validate username
        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError({"username": "This username is already existed!"})
        # Validate email
        if User.objects.filter(username=attrs["email"]).exists():
            raise serializers.ValidationError({"email": "This email is already existed!"})
        # Check matching password
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Password didn't match!"})

        # add all fields to create an instance
        return attrs

    def create(self, validate_data):
        user = User.objects.create_user(
            username=validate_data["username"],
            email=validate_data["email"],
        )
        
        user.set_password(validate_data["password"])
        user.save()
        
        token = RefreshToken.for_user(user)        
        response = { "refresh": str(token),, "access": str(token.access_token) }

        return user


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = "__all__"
