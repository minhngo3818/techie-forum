from rest_framework import serializers
from rest_framework import exceptions
from .models import Thread, Comment, ParentChildComment, Like, Memorize, Tag
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


class ThreadSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True, slug_field="name", queryset=Tag.objects.all()
    )
    category = serializers.ChoiceField(choices=CATEGORIES)
    comment_counts = serializers.SerializerMethodField("get_comment_counts")

    class Meta:
        model = Thread
        fields = "__all__"
        read_only_fields = ["created_date", "category"]

    @classmethod
    def get_comment_counts(self):
        return Comment.objects.all().count()
