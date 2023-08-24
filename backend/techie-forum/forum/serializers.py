from rest_framework import serializers
from django.db import transaction
from user.models import Profile
from user.serializers import ProfileSerializer
from .choices import CATEGORIES
from forum.helper.serializer.image_serializer_helper import (
    create_multiple_images,
    update_multiple_images,
)
from .models import Thread, Comment, ParentChildComment, Like, Memorize, Tag, Image
from django.contrib.auth.models import AnonymousUser


class NestedProfileSerializer(serializers.ModelSerializer):
    """
    Serialize short version of profile for thread and comment
    """

    class Meta:
        model = Profile
        fields = ["id", "profile_name", "avatar"]


class TagListSerializer(serializers.ListSerializer):
    """
    Serialize a list of tags
    """

    def to_representation(self, data):
        tag_list = []

        # Represent tag objects if non-nested serializing
        if data.__class__.__name__ == "list":
            for tag in data:
                tag_list.append(
                    {"id": tag.id, "name": tag.name, "created_at": tag.created_at}
                )

        # Represent tag names if nested serializing under a post
        if data.__class__.__name__ == "ManyRelatedManager":
            for tag in data.all():
                tag_list.append(tag.name)

        return tag_list


class TagSerializer(serializers.ModelSerializer):
    """
    Serialize tag instance
    """

    class Meta:
        model = Tag
        fields = "__all__"
        read_only_fields = ("id", "created_at")
        list_serializer_class = TagListSerializer

    # Deserialize tag as string
    def to_internal_value(self, data):
        return data


class ImageListSerializer(serializers.ListSerializer):
    """
    Serialize list of images
    """

    def to_representation(self, data):
        request = self.context.get("request")
        image_list = []

        # Represent images as a list of image objects
        if data.__class__.__name__ == "list":
            for image in data:
                image_list.append(
                    {
                        "id": image.id,
                        "image": request.build_absolute_uri(image.image.url),
                        "post": str(image.post.id),
                        "created_at": image.created_at,
                    }
                )

        # Represent images as a list of image urls
        if data.__class__.__name__ == "RelatedManager":
            for image in data.all():
                image_list.append(request.build_absolute_uri(image.image.url))

        return image_list


class ImageSerializer(serializers.ModelSerializer):
    """
    Serialize image instance
    """

    class Meta:
        model = Image
        fields = "__all__"
        read_only_fields = ("post", "created_at")
        list_serializer_class = ImageListSerializer

    # Deserialize image as a string
    def to_internal_value(self, data):
        return data


class LikeSerializer(serializers.ModelSerializer):
    """
    Serialize like instance
    """

    class Meta:
        model = Like
        fields = "__all__"
        read_only_fields = ["created_at"]

    def validate(self, attrs):
        if attrs["post_id"] == "" or attrs["user"] == "":
            raise serializers.ValidationError("Field is empty")

        return super().validate(attrs)


class MemorizedSerializer(serializers.ModelSerializer):
    """
    Serialize memorize instance
    """

    class Meta:
        model = Memorize
        fields = "__all__"
        read_only_fields = ["created_at"]

    def validate(self, attrs):
        if attrs["thread"] == "" or attrs["user"] == "":
            raise serializers.ValidationError("Field is empty")

        return super().validate(attrs)


class ParentChildCommentSerializer(serializers.ModelSerializer):
    """
    Serialize parent child comment relations
    """

    class Meta:
        model = ParentChildComment
        fields = "__all__"
        read_only_fields = ["__all__"]


class CommentSerializer(serializers.ModelSerializer):
    """
    Serialize to view and manage comment instances
    """

    author = NestedProfileSerializer()
    parent = serializers.CharField(required=False, default=None)
    images = ImageSerializer(many=True, required=False)
    likes = serializers.IntegerField(source="get_likes", required=False)

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
            "depth",
            "created_at",
            "updated_at",
            "likes",
        ]
        read_only_fields = ("id", "is_active", "created_at", "updated_at", "likes")

    def to_representation(self, instance):

        parent = None

        if ParentChildComment.objects.filter(child=instance).exists():
            parent = ParentChildComment.objects.get(child=instance).parent.id

        if not instance.is_active:
            return {
                "id": instance.id,
                "author": instance.author,
                "cmt_thread": instance.cmt_thread,
                "parent": parent,
                "is_active": instance.is_active,
                "created_at": instance.create_at,
                "updated_at": instance.updated_at,
                "likes": instance.get_likes,
                "notice": "This comment was deleted by user.",
            }

        default_data = super(CommentSerializer, self).to_representation(instance)
        default_data["parent"] = parent
        print(default_data)

        return default_data

    def validate(self, attrs):
        author = attrs.get("author", None)  # Object of author profile
        depth = attrs.get("depth", 0)
        parent = attrs.get("parent", None)

        errors = {}

        if not Profile.objects.filter(id=author.id).exists():
            errors["author"] = "author does not exist"

        if not Comment.objects.filter(id=parent).exists():
            errors["parent"] = "parent comment does not exist"
        else:
            attrs["parent"] = Comment.objects.get(id=parent)

        if depth > 0 and (parent == "" or parent is None):
            errors["parent"] = "depth is provided but missing parent comment"

        if depth == 0 and parent:
            errors["depth"] = "parent comment is provided but missing depth"

        if errors:
            raise serializers.ValidationError(errors)

        return attrs

    def create(self, validated_data):
        parent = validated_data.pop("parent", None)
        images = validated_data.pop("images", None)
        comment = Comment.objects.create(**validated_data)

        if comment.depth > 0 and parent:
            ParentChildComment.objects.create(parent=parent, child=comment)

        create_multiple_images(images, comment)

        return comment

    def update(self, instance, validated_data):
        images = validated_data.pop("images", None)
        update_multiple_images(images, instance)
        instance = super().update(instance, validated_data)
        instance.save()
        return instance


class ThreadSerializer(serializers.ModelSerializer):
    """
    Serialize to view and manage thread instances
    """

    author = NestedProfileSerializer(read_only=True)
    tags = TagSerializer(many=True, required=False)
    images = ImageSerializer(many=True, required=False)
    likes = serializers.IntegerField(source="get_likes", required=False)
    memorized = serializers.SerializerMethodField("is_memorized")
    category = serializers.ChoiceField(choices=CATEGORIES, required=True)
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
        read_only_fields = (
            "id",
            "author",
            "category",
            "created_at",
            "is_active",
            "likes",
            "comment_counts",
        )

    def get_comment_counts(self, instance):
        request = self.context["request"]

        if request.method != "POST":
            return Comment.objects.filter(cmt_thread=instance.id).count()

        return 0

    def is_memorized(self, instance):
        request = self.context["request"]

        if type(request.user) is AnonymousUser:
            return False

        profile = Profile.objects.get(owner=request.user)

        if (
            request.method == "GET"
            and instance.memorized.filter(id=profile.id).exists()
        ):
            return True

        return False

    def validate(self, attrs):
        title = attrs.get("title", None)
        content = attrs.get("content", None)

        errors = {}

        if title is None or title == "":
            errors["title"] = "title is required"

        if Thread.objects.filter(title=title).exists():
            errors["title"] = "title is already existed"

        if content is None or content == "":
            errors["content"] = "content is required"

        if errors:
            raise serializers.ValidationError(errors)

        return attrs

    def create(self, validated_data):
        tags = validated_data.pop("tags", None)
        images = validated_data.pop("images", None)
        thread = Thread.objects.create(**validated_data)

        if tags is not None:
            with transaction.atomic():
                for tag in tags:
                    tag, created = Tag.objects.get_or_create(name=tag)
                    thread.tags.add(tag)

        create_multiple_images(images, thread)

        return thread

    def update(self, instance, validated_data):
        new_tags = validated_data.pop("tags", None)
        images = validated_data.pop("images", None)

        if new_tags is not None:
            current_tags = instance.tags.all()
            excluded_tags = current_tags.exclude(name__in=new_tags)
            instance.tags.remove(*excluded_tags)

            for new_tag in new_tags:
                tag, created = Tag.objects.get_or_create(name=new_tag)
                instance.tags.add(tag)

        update_multiple_images(images, instance)
        instance = super().update(instance, validated_data)
        instance.save()

        return instance

    def to_representation(self, instance):
        if not instance.is_active:
            return {
                "id": instance.id,
                "author": instance.author,
                "is_active": instance.is_active,
                "category": instance.category,
                "title": instance.title,
                "created_at": instance.created_at,
                "updated_at": instance.updated_at,
                "likes": instance.get_likes,
                "count_comments": self.get_comment_counts(instance),
                "notice": "This thread was deleted by user.",
            }

        default_data = super(ThreadSerializer, self).to_representation(instance)
        return default_data
