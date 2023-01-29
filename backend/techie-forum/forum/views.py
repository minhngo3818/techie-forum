from django.db.models import Q
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework import status
from user.models import Profile
from .models import BasePost, Thread, Comment, ParentChildComment, Like, Memorize, Tag
from .serializers import (
    ThreadSerializer,
    CommentSerializer,
    LikeSerializer,
    MemorizedSerializer,
    TagSerializer,
)
from .pagination import PaginationHelper


class ThreadViewSet(viewsets.ModelViewSet):
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper

    def get_queryset(self):
        category = self.request.query_params.get("category", "")

        if category != "":
            return self.queryset.filter(category=category)

        return self.queryset

    def perform_create(self, serializer):
        tag_names = self.request.data.get("tags", [])
        for name in tag_names:
            Tag.objects.get_or_create(name=name)
        serializer = self.serializer_class(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user.profile)
        return Response(serializer.data)

    def perform_update(self, serializer):
        # TODO: Add query to remove tags are not contained in the request
        tag_names = self.request.data.get("tag", [])
        for name in tag_names:
            Tag.objects.get_or_create(name=name)

        serializer.save(owner=self.request.user.profile, updated_at=timezone.now())


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper

    def get_queryset(self):
        thread_id = self.request.GET.get("tid", "")
        parent_id = self.request.GET.get("pcid", "")
        depth = self.request.GET.get("depth", 0)
        comment_pairs = ParentChildComment.objects.filter(parent=parent_id)

        return Comment.objects.filter(
            Q(id=comment_pairs.child | None),
            _thread=thread_id,
            depth=depth,
        ).defer("content")

    def perform_create(self, serializer):
        thread_id = self.request.POST.get("tid", "")
        parent_id = self.request.POST.get("pcid", "")
        depth = self.request.POST.get("depth", 0)
        serializer.save(owner=self.request.user.profile, _thread=thread_id, depth=depth)

        if depth > 0 and parent_id != "":
            ParentChildComment.objects.create(
                parent=parent_id, child=serializer.data.get("id")
            )

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user.profile, updated_at=timezone.now())


class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()
    permission_classes = [IsAuthenticated]
    filter_fields = ("pid", "post_id")

    def get_queryset(self):
        return self.queryset

    def create(self, request, *args, **kwargs):
        post_id = request.data.get("post", "")
        pid = request.data.get("owner", "")

        if post_id == "" or pid == "":
            return Response(
                {"error": "Failed to provide post id and profile id"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        post = BasePost.objects.get(id=post_id)
        owner = Profile.objects.get(id=pid)
        liked, created = Like.objects.get_or_create(post=post, owner=owner)

        if created:
            return Response(
                {"error": "Invalid action, double like"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        post.liked.add(owner)

        return Response(
            data={"success": "Post was liked"}, status=status.HTTP_201_CREATED
        )

    @action(
        methods=["delete"],
        detail=False,
        url_path="remove-like",
        url_name="remove_like",
    )
    def remove_like(self, request):
        post_id = request.query_params.get("post_id", "")
        pid = request.query_params.get("pid", "")

        if post_id == "" or pid == "":
            return Response(
                data={"error": "Query params must contain post_id and pid!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            post = BasePost.objects.get(id=post_id)
            owner = Profile.objects.get(id=pid)
            instance = self.queryset.get(post=post_id, owner=pid)
            instance.delete()
            post.liked.remove(owner)

        except Exception as e:
            return Response(
                data={"error": "Query failed {}".format(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(data={"success": "User was unliked"}, status=status.HTTP_200_OK)


class MemorizeViewSet(viewsets.ModelViewSet):
    serializer_class = MemorizedSerializer
    queryset = Memorize.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        tid = self.request.query_params.get("tid", "")
        pid = self.request.query_params.get("pid", "")

        if tid == "" or pid == "":
            return Response(
                data={"error": "Query params must contain tid and pid"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        thread = Thread.objects.get(id=tid)
        owner = Profile.objects.get(id=pid)
        memorize, created = self.queryset.get_or_create(thread=thread, owner=owner)

        if created:
            return Response(
                data={"message": "The thread was memorized!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        thread.memorized.add(owner)

        return Response(
            data={"success": "Thread was memorized"}, status=status.HTTP_201_CREATED
        )

    @action(
        methods=["delete"],
        detail=False,
        url_path="remove-memorize",
        url_name="remove-memorize",
    )
    def remove_memorize(self, request):
        tid = request.query_params.get("tid", "")
        pid = request.query_params.get("pid", "")

        if tid == "" or pid == "":
            return Response(
                data={"error": "Query params must contain tid and pid"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            thread = BasePost.objects.get(id=tid)
            owner = Profile.objects.get(id=pid)
            instance = self.queryset.get(thread=thread, owner=pid)
            instance.delete()
            thread.memorized.remove(owner)

        except Exception as e:
            return Response(
                data={"error": "Query failed {}".format(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(data={"success": "User was unliked"}, status=status.HTTP_200_OK)


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    query_set = Tag.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
