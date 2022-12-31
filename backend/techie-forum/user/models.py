from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
import os


class User(AbstractUser):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    username = models.CharField(
        max_length=50, blank=True, null=True, unique=True
    )
    email = models.EmailField(blank=True, null=True, unique=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username


class Profile(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )
    owner = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    profile_name = models.CharField(max_length=100, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    avatar = models.ImageField(
        default=os.path.join("avatar", "default-avatar.png"),
        upload_to="avatar",
        null=True,
        blank=True,
    )  # add default avatar
    twitter_url = models.URLField(null=True, blank=True)
    reddit_url = models.URLField(null=True, blank=True)
    github_url = models.URLField(null=True, blank=True)
    stackoverflow_url = models.URLField(null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    indeed_url = models.URLField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_date"]

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
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    title = models.CharField(max_length=200, null=True, blank=True)
    demo = models.CharField(max_length=300, null=True, blank=True)
    repo = models.CharField(max_length=300, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_date"]

    def __str__(self):
        return self.title

