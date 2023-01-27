from django.db import models
from user.models import Profile
import uuid
from .choices import CATEGORIES
from django.utils import timezone


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
        Profile, default=None, blank=True, related_name="likes_set"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return "{} {}".format(self.owner.profile_name, self.id)

    @property
    def get_likes(self) -> int:
        return int(self.liked.all().count())


class Thread(BasePost):
    title = models.CharField(max_length=255, null=True, blank=True)
    tags = models.ManyToManyField("Tag", blank=True)
    memorized = models.ManyToManyField(
        Profile, default=None, blank=True, related_name="is_memorized_set"
    )
    category = models.CharField(
        max_length=100, choices=CATEGORIES, null=True, blank=True
    )

    def __str__(self) -> str:
        return str(self.title)


class Comment(BasePost):
    _thread = models.ForeignKey(
        Thread, on_delete=models.CASCADE, related_name="comments"
    )
    depth = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return "{}-{}".format(self.owner, self.thread.title)


class ParentChildComment(models.Model):
    parent = models.ForeignKey(
        Comment, on_delete=models.CASCADE, related_name="parent_comment"
    )
    child = models.ForeignKey(
        Comment, on_delete=models.CASCADE, related_name="child_comment"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["parent", "child"], name="comment_parent_child"
            )
        ]
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return "{}-has-{}".format(self.parent, self.child)


class Like(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(BasePost, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["owner", "post"], name="user_like_post")
        ]
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return "{}-{}".format(self.owner, self.post)


class Memorize(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["owner", "thread"], name="user_memorize_thread"
            )
        ]
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return "{}-{}".format(self.owner, self.thread)


class Tag(models.Model):
    name = models.CharField(
        db_index=True, max_length=100, null=True, blank=True, unique=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.name)


class Image(models.Model):
    post = models.ForeignKey(BasePost, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="forum", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.image.name)
