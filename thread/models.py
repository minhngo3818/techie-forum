from django.db import models
from user.models import Profile
import uuid

CATEGORIES = {
    "operating_system": "operating system",
    "game_making": "game making",
    "server": "server",
    "cybersecurity": "cybersecurity",
    "programming_languages": "programming_languages",
}


class Threads(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True, related_name='Threads')
    content = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    liked = models.ManyToManyField(Profile, default=None, blank=True, related_name='liked')
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.author.name

    @property
    def numLikes(self):
        num_likes = str(self.liked.all().count()) + " Like"
        if self.liked.all().count() > 1:
            num_likes += "s"
        return num_likes


class Comment(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments')
    tweet = models.ForeignKey(Threads, on_delete=models.CASCADE, null=True, blank=True, related_name='comments_set')
    content = models.TextField(null=True, blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    liked = models.ManyToManyField(Profile, default=None, blank=True, related_name='comment_like')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    class Meta:
        ordering = ['created', '-updated']

    def __str__(self):
        return "{}, comment created on {}".format(self.author.name, self.content)

    @property
    def numLikes(self):
        num_likes = str(self.liked.all().count()) + " Like"
        if self.liked.all().count() > 1:
            num_likes += "s"
        return num_likes


class Like(models.Model):
    LIKE_CHOICES = (
        ('Like', 'Like'),
        ('Unlike', 'Unlike')
    )

    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    tweet = models.ForeignKey(Threads, on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_CHOICES, default='Like', max_length=10)

    def __str__(self):
        return str(self.tweet)


class LikeComment(models.Model):
    LIKE_CHOICES = (
        ('Like', 'Like'),
        ('Unlike', 'Unlike')
    )

    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_CHOICES, default='Like', max_length=10)

    def __str__(self):
        return str(self.comment)