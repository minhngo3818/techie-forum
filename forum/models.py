from django.db import models
from user.models import Profile
import uuid
from .choices import CATEGORIES


class Thread(models.Model):
    owner = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, blank=True, related_name="Threads"
    )
    content = models.TextField(null=True, blank=True)
    tags = models.ManyToManyField("Tag", blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    liked = models.ManyToManyField(
        Profile, default=None, blank=True, related_name="liked"
    )
    category = models.CharField(
        max_length=100, choices=CATEGORIES, null=True, blank=True
    )
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )

    class Meta:
        ordering = ["-created_date"]

    def __str__(self) -> str:
        return str(self.author.name)

    @property
    def numLikes(self) -> int:
        num_likes = str(self.liked.all().count()) + " Like"
        if self.liked.all().count() > 1:
            num_likes += "s"
        return int(num_likes)


class Comment(models.Model):
    owner = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="comments"
    )
    tweet = models.ForeignKey(
        Thread,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="comments_set",
    )
    content = models.TextField(null=True, blank=True)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )
    liked = models.ManyToManyField(
        Profile, default=None, blank=True, related_name="comment_like"
    )
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )

    class Meta:
        ordering = ["-created_date", "-updated_date"]

    def __str__(self) -> str:
        return "{}, comment created on {}".format(self.author.name, self.content)

    @property
    def numLikes(self) -> int:
        num_likes = str(self.liked.all().count()) + " Like"
        if self.liked.all().count() > 1:
            num_likes += "s"
        return int(num_likes)


class Like(models.Model):
    LIKE_CHOICES = (("Like", "Like"), ("Unlike", "Unlike"))

    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    tweet = models.ForeignKey(Thread, on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_CHOICES, default="Like", max_length=10)

    def __str__(self) -> str:
        return str(self.tweet)


class LikeComment(models.Model):
    LIKE_CHOICES = (("Like", "Like"), ("Unlike", "Unlike"))

    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_CHOICES, default="Like", max_length=10)

    def __str__(self) -> str:
        return str(self.comment)


class Tag(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )

    def __str__(self) -> str:
        return str(self.name)
