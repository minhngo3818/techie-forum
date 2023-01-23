from rest_framework import serializers
from rest_framework import exceptions
from .models import Thread, Comment, ParentChildComment, Like, Memorize, Tag, Image
from .choices import CATEGORIES


class ParentChildCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentChildComment
        fields = "__all__"
        readonly_fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class LikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class MemorizedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Memorize
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

    def create(self, validated_data):
        tag, created = Tag.objects.get_or_create(**validated_data)
        if not created:
            raise exceptions.ValidationError(validated_data["name"] + "already exists")
        return tag


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class ThreadSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    images = ImageSerializer(source="image_set", many=True, read_only=True)
    likes = serializers.IntegerField(source="get_likes", read_only=True)
    category = serializers.ChoiceField(choices=CATEGORIES)
    comment_counts = serializers.SerializerMethodField("count_comments")

    class Meta:
        model = Thread
        fields = [
            "id",
            "owner",
            "is_active",
            "category",
            "title",
            "content",
            "images",
            "tags",
            "created_at",
            "updated_at",
            "likes",
            "comment_counts"
        ]

    @classmethod
    def count_comments(cls, thread):
        return Comment.objects.filter(_thread=thread.id).count()



