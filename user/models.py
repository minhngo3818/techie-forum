from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
import os


class User(AbstractUser):
    username = models.CharField(
        max_length=50, blank=True, null=True, unique=True
    )  # no need for user id
    email = models.EmailField(blank=True, null=True, unique=True)
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )

    USERNAME_FIELD = "username"

    def __str__(self):
        return self.username


class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)

    # self
    display_name = models.CharField(max_length=100, null=True, blank=True)
    display_name_id = models.IntegerField(
        default=1000, null=True, blank=True, unique=True
    )  # use in put request
    bio = models.TextField(null=True, blank=True)
    avatar = models.ImageField(
        default=os.path.join("media", "avatar", "default-avatar.png"),
        upload_to=os.path.join("media", "avatar"),
        null=True,
        blank=True,
    )  # add default avatar

    # social media
    twitter_url = models.URLField(null=True, blank=True)
    reddit_url = models.URLField(null=True, blank=True)
    github_url = models.URLField(null=True, blank=True)
    stackoverflow_url = models.URLField(null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    indeed_url = models.URLField(null=True, blank=True)

    # others
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )

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
