from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.decorators import action
from rest_framework import status
from user.models import Profile
from .models import (
    BasePost,
    Thread,
    Comment,
    Like,
    Mark,
    ParentChildComment,
    Tag,
    Image,
)
from .serializers import (
    ThreadSerializer,
    CommentSerializer,
    LikeSerializer,
    MarkSerializer,
    TagSerializer,
    ImageSerializer,
)
from .pagination import PaginationHelper


class ThreadViewSet(viewsets.ModelViewSet):
    """
    Fetch to view and manage thread
    """

    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PaginationHelper

    def get_queryset(self):
        category = self.request.query_params.get("category", None)

        if category:
            return self.queryset.filter(category=category)

        return self.queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profile)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user.profile, updated_at=timezone.now())

    # Remove thread: perform pseudo remove by setting inactive thread
    @action(methods=["patch"], detail=True, url_path="remove", url_name="remove")
    def remove_thread(self, request, pk):
        thread = self.get_object()
        thread.is_active = False
        thread.save()
        return Response({"success": "thread was removed successfully."})

    # Recover thread: bring back thread to view if request
    @action(methods=["patch"], detail=True, url_path="recover", url_name="recover")
    def recover_thread(self, request, pk):
        thread = self.get_object()
        thread.is_active = True
        thread.save()
        return Response({"success": "thread was recovered successfully."})


class CommentViewSet(viewsets.ModelViewSet):
    """
    Fetch to view and manage comment
    """

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper

    def filter_queryset(self, queryset):
        thread_id = self.request.query_params.get("thread", None)
        parent_id = self.request.query_params.get("parent", None)

        if thread_id and parent_id:
            child_comment_ids = ParentChildComment.objects.filter(
                parent=parent_id
            ).values("child")
            return queryset.filter(post_thread=thread_id, id__in=child_comment_ids)

        if thread_id:
            return queryset.filter(post_thread=thread_id, depth=0)

        return queryset

    def perform_destroy(self, instance):
        related_instance = ParentChildComment.objects.get(child=instance.id)
        related_instance.delete()
        instance.delete()


class LikeViewSet(viewsets.ModelViewSet):
    """
    Fetch to perform like and unlike
    """

    serializer_class = LikeSerializer
    queryset = Like.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        liked_instance = serializer.save(profile=self.request.user.profile)
        liked_instance.post.liked.add(liked_instance.profile)

    @action(
        methods=["DELETE"],
        detail=False,
        url_path="unlike",
        url_name="unlike",
    )
    def unlike(self, request):
        post_id = request.query_params.get("post")
        serializer = self.serializer_class(
            data={"post": post_id}, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        try:
            with transaction.atomic():
                post = serializer.validated_data.get("post")
                profile = request.user.profile
                like = get_object_or_404(Like, post=post, profile=profile)
                post.liked.remove(profile)
                like.delete()
        except:
            return Response(
                {"errors": {"like": "Delete transaction failed"}},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(status=status.HTTP_200_OK)


class MarkViewSet(viewsets.ModelViewSet):
    """
    Fetch to mark a thread
    """

    serializer_class = MarkSerializer
    queryset = Mark.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        mark_instance = serializer.save(profile=self.request.user.profile)
        mark_instance.thread.marked.add(mark_instance.profile)

    @action(
        methods=["DELETE"],
        detail=False,
        url_path="unmark",
        url_name="unmark",
    )
    def unmark(self, request):
        thread_id = request.query_params.get("thread")
        serializer = self.serializer_class(
            data={"thread": thread_id}, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        try:
            thread = serializer.validated_data.get("thread")
            profile = request.user.profile
            mark = get_object_or_404(Mark, thread=thread, profile=profile)
            thread.marked.remove(profile)
            mark.delete()
        except:
            return Response(
                {"errors": {"mark": "Delete transaction failed"}},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(status=status.HTTP_200_OK)


class TagViewSet(viewsets.ModelViewSet):
    """
    Fetch to view and manage tags
    """

    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper


class ImageViewSet(viewsets.ModelViewSet):
    """
    Fetch to view and manage post images
    """

    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper
