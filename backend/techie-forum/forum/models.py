from django.db import models
from user.models import Profile
from .choices import CATEGORIES
import uuid
import os


class BasePost(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )
    author = models.ForeignKey(
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
    is_edited = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return "{} {}".format(self.author.profile_name, self.id)

    @property
    def get_likes(self) -> int:
        return int(self.liked.all().count())


class Thread(BasePost):
    title = models.CharField(max_length=255, null=True, blank=True)
    tags = models.ManyToManyField("Tag", blank=True)
    marked = models.ManyToManyField(
        Profile, default=None, blank=True, related_name="is_markd_set"
    )
    category = models.CharField(
        max_length=100, choices=CATEGORIES, null=True, blank=True
    )

    def __str__(self) -> str:
        return str(self.title)

    @property
    def get_images(self):
        return self.objects.get(self.id).image_set


class Comment(BasePost):
    cmt_thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    depth = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return "comment: {} | thread: {}".format(
            str(self.id)[:8], self.cmt_thread.title
        )


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
        return "parent: {} | child: {}".format(
            str(self.parent.id)[:8], str(self.child.id)[:8]
        )


class Like(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(BasePost, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["profile", "post"], name="user_like_post")
        ]
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return "user: {} | post: {}".format(
            self.profile.profile_name, str(self.post.id)[:8]
        )


class Mark(models.Model):
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, blank=True
    )
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["profile", "thread"], name="profile_mark_thread"
            )
        ]
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return "profile: {} | thread {}".format(
            self.profile.profile_name, self.thread.title
        )


class Tag(models.Model):
    name = models.CharField(
        db_index=True, max_length=100, null=True, blank=True, unique=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return str(self.name)


class Image(models.Model):
    post = models.ForeignKey(BasePost, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="forum", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-post"]

    def __str__(self) -> str:
        return "id: {} | name: {}".format(
            str(self.id), os.path.basename(self.image.name)
        )

    @property
    def image_url(self) -> str:
        try:
            img_url = self.image.url
        except:
            img_url = ""

        return img_url
