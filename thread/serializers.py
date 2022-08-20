from rest_framework import serializers
from .models import Threads, Comments, Like, LikeComment
from user.serializers import ProfileSerializers


class ThreadsSerializers(serializers.HyperlinkedModelSerializer):
    owner = ProfileSerializers(many=False)

    class Meta:
        model = Threads
        fields = "__all__"


class CommentsSerializers(serializers.HyperlinkedModelSerializer):
    owner = ProfileSerializers(many=False)
    thread = ThreadsSerializers(many=False)

    class Meta:
        model = Comments
        fields = "__all__"


class LikeSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class LikeCommentSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LikeComment
        fields = "__all__"
