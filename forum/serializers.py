from rest_framework import serializers
from .models import Thread, Comment, Like, LikeComment
from user.serializers import ProfileSerializer


class ThreadSerializer(serializers.HyperlinkedModelSerializer):
    owner = ProfileSerializer(many=False)

    class Meta:
        model = Thread
        fields = "__all__"


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    owner = ProfileSerializer(many=False)
    thread = ThreadSerializer(many=False)

    class Meta:
        model = Comment
        fields = "__all__"


class LikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class LikeCommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LikeComment
        fields = "__all__"
