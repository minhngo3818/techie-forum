from rest_framework import serializers

from user.models import Profile
from .models import Thread, Comment, ParentChildComment, Like, Memorize, Tag, Image
from .choices import CATEGORIES


class TagListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        tag_list = []

        if data.__class__.__name__ == "list":
            for tag in data:
                tag_list.append(
                    {"id": tag.id, "name": tag.name, "created_at": tag.created_at}
                )

        if data.__class__.__name__ == "ManyRelatedManager":
            for tag in data.all():
                tag_list.append(tag.name)

        return tag_list


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"
        read_only_fields = ("id", "created_at")
        list_serializer_class = TagListSerializer


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"
        read_only_fields = ["created_at"]

    def validate(self, attrs):
        if attrs["post_id"] == "" or attrs["user"] == "":
            raise serializers.ValidationError("Field is empty")

        return super().validate(attrs)


class MemorizedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memorize
        fields = "__all__"
        read_only_fields = ["created_at"]

    def validate(self, attrs):
        if attrs["thread"] == "" or attrs["user"] == "":
            raise serializers.ValidationError("Field is empty")

        return super().validate(attrs)


class ParentChildCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentChildComment
        fields = "__all__"
        read_only_fields = ["__all__"]


class CommentSerializer(serializers.ModelSerializer):
    parent = ParentChildCommentSerializer(source="parent_set", read_only=True)
    images = ImageSerializer(source="image_set", many=True, read_only=True)
    likes = serializers.IntegerField(source="get_likes", read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "author",
            "cmt_thread",
            "parent",
            "is_active",
            "content",
            "images",
            "created_at",
            "updated_at",
            "likes",
        ]

    def to_representation(self, instance):
        if not instance.is_active:
            return {
                "id": instance.id,
                "author": instance.author,
                "cmt_thread": instance.cmt_thread,
                "parent": instance.parent,
                "is_active": instance.is_active,
                "created_at": instance.create_at,
                "updated_at": instance.updated_at,
                "likes": instance.get_likes,
                "notice": "This comment was deleted by user.",
            }

        default_data = super(CommentSerializer, self).to_representation(instance)
        return default_data


class ThreadSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    images = ImageSerializer(source="image_set", many=True, required=False)
    likes = serializers.IntegerField(source="get_likes", required=False)
    memorized = serializers.SerializerMethodField("is_memorized")
    category = serializers.ChoiceField(choices=CATEGORIES, required=False)
    comment_counts = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = [
            "id",
            "author",
            "is_active",
            "category",
            "title",
            "content",
            "images",
            "tags",
            "created_at",
            "updated_at",
            "memorized",
            "likes",
            "comment_counts",
        ]
        read_only_fields = ("id", "category", "created_at", "likes", "comment_counts")

    def get_comment_counts(self, instance):
        request = self.context["request"]

        if request.method != "POST":
            return Comment.objects.filter(cmt_thread=instance.id).count()

        return 0

    def is_memorized(self, instance):
        request = self.context["request"]
        profile = Profile.objects.get(owner=request.user)

        if (
            request.method == "GET"
            and instance.memorized.filter(id=profile.id).exists()
        ):
            return True

        return False

    def validate(self, attrs):
        request = self.context["request"]

        if request.method == "POST":
            author = attrs.get("author", "")
            category = attrs.get("category", "")

            if author == "":
                raise serializers.ValidationError("author is required")

            if category == "":
                raise serializers.ValidationError("category is required")

        return attrs

    def to_representation(self, instance):
        if not instance.is_active:
            return {
                "id": instance.id,
                "author": instance.author.id,
                "is_active": instance.is_active,
                "category": instance.category,
                "created_at": instance.created_at,
                "updated_at": instance.updated_at,
                "likes": instance.get_likes,
                "count_comments": self.get_comment_counts(instance),
                "notice": "This thread was deleted by user.",
            }

        default_data = super(ThreadSerializer, self).to_representation(instance)
        return default_data
