from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken
import uuid
import os


class User(AbstractUser):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self) -> str:
        return str(self.username)

    @property
    def get_tokens(self) -> dict[str, str]:
        token = RefreshToken().for_user(self)

        return {"refresh": str(token), "access": str(token.access_token)}


class Profile(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )
    owner = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    profile_name = models.CharField(max_length=255, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    avatar = models.ImageField(
        default=os.path.join("avatar", "default-avatar.png"),
        upload_to="avatar",
        null=True,
        blank=True,
    )
    twitter_url = models.URLField(null=True, blank=True)
    reddit_url = models.URLField(null=True, blank=True)
    github_url = models.URLField(null=True, blank=True)
    stackoverflow_url = models.URLField(null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    indeed_url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return str(self.owner.username)

    @property
    def image_url(self) -> str:
        try:
            img_url = self.avatar.url
        except:
            img_url = ""

        return img_url


class Project(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    summary = models.CharField(max_length=500, null=True, blank=True)
    demo = models.CharField(max_length=300, null=True, blank=True)
    repo = models.CharField(max_length=300, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return str(self.title)
