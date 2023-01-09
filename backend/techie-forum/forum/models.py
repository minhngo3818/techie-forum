from django.db import models
from user.models import Profile
import uuid
from .choices import CATEGORIES


class BasePost(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )
    owner = models.ForeignKey(
        Profile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    content = models.TextField(null=True, blank=True)
    liked = models.ManyToManyField(
        Profile, default=None, blank=True, related_name="liked"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return "Post by".format(self.owner)

    @property
    def get_likes(self) -> int:
        return int(self.liked.all().count())


class Thread(BasePost):
    title = models.CharField(max_length=255, null=True, blank=True)
    tags = models.ManyToManyField("Tag", blank=True)
    memorized = models.ManyToManyField(
        Profile, default=None, blank=True, related_name="is_memorized_thread"
    )
    category = models.CharField(
        max_length=100, choices=CATEGORIES, null=True, blank=True
    )

    def __str__(self) -> str:
        return "thread-{}".format(self.title)


class Comment(BasePost):
    thread_cmt = models.ForeignKey(
        Thread,
        on_delete=models.CASCADE,
    )

    def __str__(self) -> str:
        return "{}-comment-{}".format(self.owner, self.thread_cmt)


class ParentChildComment(models.Model):
    parent = models.ForeignKey(
        Comment, on_delete=models.CASCADE, related_name="parent_comment"
    )
    child = models.ForeignKey(
        Comment, on_delete=models.CASCADE, related_name="child_comment"
    )
    depth = models.PositiveIntergerField(default=0)

    def __str__(self) -> str:
        return "comment-{}-has-{}".format(self.parent, self.child)


class Like(models.Model):
    LIKE_CHOICES = (("Like", "Like"), ("Unlike", "Unlike"))

    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_CHOICES, default="Like", max_length=10)

    def __str__(self) -> str:
        return str(self.owner)


class Memorize(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, null=True, blank=True)
    value = models.BooleanField(default=False)

    def __str__(self) -> str:
        return r"{}-memorize-{}".format(self.owner, self.thread)


class Tag(models.Model):
    name = models.CharField(
        db_index=True, max_length=100, blank=True, null=True, unique=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return str(self.name)
