from rest_framework import serializers
from user.serializers import ProfileSerializer
from .models import Thread, Comment, Like, LikeComment, Tag
from user.models import Profile


class CommentSerializer(serializers.ModelSerializer):
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


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class ThreadSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.id")
    tags = serializers.SlugRelatedField(
        many=True, queryset=Tag.objects.all(), slug_field="name"
    )

    class Meta:
        model = Thread
        fields = "__all__"
        read_only_fields = ("created_date", "updated_date")
