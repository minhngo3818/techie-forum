from rest_framework import serializers
from .models import Thread, Comment, Like, LikeComment
from user.serializers import ProfileSerializers


class ThreadSerializers(serializers.HyperlinkedModelSerializer):
    owner = ProfileSerializers(many=False)

    class Meta:
        model = Thread
        fields = "__all__"


class CommentSerializers(serializers.HyperlinkedModelSerializer):
    owner = ProfileSerializers(many=False)
    thread = ThreadSerializers(many=False)

    class Meta:
        model = Comment
        fields = "__all__"


class LikeSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class LikeCommentSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LikeComment
        fields = "__all__"
