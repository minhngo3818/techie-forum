from django.db import models
from user.models import Profile
import uuid
from .choices import CATEGORIES


class Thread(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )
    owner = models.ForeignKey(
        Profile, on_delete=models.SET_NULL, null=True, blank=True, related_name="Threads"
    )
    title = models.CharField(max_length=200, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    tags = models.ManyToManyField("Tag", blank=True)
    liked = models.ManyToManyField(
        Profile, default=None, blank=True, related_name="liked"
    )
    memorized = models.ManyToManyField(
        Profile, default=None, blank=True, related_name="is_memorized_thread"
    )
    category = models.CharField(
        max_length=100, choices=CATEGORIES, null=True, blank=True
    )
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_date"]

    def __str__(self) -> str:
        return str(self.owner.username)

    @property
    def numLikes(self) -> int:
        num_likes = str(self.liked.all().count()) + " Like"
        if self.liked.all().count() > 1:
            num_likes += "s"
        return int(num_likes)


class Comment(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )
    owner = models.ForeignKey(
        Profile, related_name="comments", on_delete=models.SET_NULL, null=True
    )
    thread = models.ForeignKey(
        Thread,
        on_delete=models.SET_NULL,
        null=True,
        related_name="comments_set",
    )
    content = models.TextField(null=True, blank=True)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )
    liked = models.ManyToManyField(
        Profile, default=None, blank=True, related_name="comment_like"
    )
    memorized = models.ManyToManyField(
        Profile, default=None, blank=True, related_name="is_memorized_comment"
    )
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_date", "-updated_date"]

    def __str__(self) -> str:
        return "{}, comment created on {}".format(self.owner.name, self.content)

    @property
    def numLikes(self) -> int:
        num_likes = str(self.liked.all().count()) + " Like"
        if self.liked.all().count() > 1:
            num_likes += "s"
        return int(num_likes)


class Like(models.Model):
    LIKE_CHOICES = (("Like", "Like"), ("Unlike", "Unlike"))

    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_CHOICES, default="Like", max_length=10)

    def __str__(self) -> str:
        return str(self.owner)


class Memorize(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    value = models.BooleanField(default=False)

    def __str__(self) -> str:
        return str(self.owner)


class Tag(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True, unique=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return str(self.name)





