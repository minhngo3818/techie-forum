from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid


class User(AbstractUser):
    username = models.CharField(max_length=50, blank=True, null=True, unique=True)  # no need for user id
    email = models.EmailField(blank=True, null=True, unique=True)

    USERNAME_FIELD = "username"

    def __str__(self):
        return self.username


class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    firstName = models.CharField(max_length=100, null=True, blank=True)
    lastName = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    avatar = models.ImageField(upload_to='images', null=True, blank=True)   # add default avatar
    createdDate = models.DateTimeField(auto_now_add=True)
    updatedDate = models.DateTimeField(auto_now=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self):
        return str(self.user.name)

    @property
    def image_url(self):
        try:
            img_url = self.avatar.url
        except:
            img_url = ''

        return img_url



