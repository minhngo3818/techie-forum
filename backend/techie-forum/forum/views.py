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

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user.profile, updated_at=timezone.now())


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper

    def get_queryset(self):
        return Response(data=self.queryset, status=status.HTTP_200_OK)

    def filter_queryset(self, queryset):
        thid = self.request.query_params.get("thid", "")
        pcid = self.request.query_params.get("pcid", "")
        depth = self.request.query_params.get("depth")
        parent_child_comments = ParentChildComment.objects.filter(parent=pcid)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data)
        serializer.is_valid()
        serializer.save(owner=self.request.data["author"])
        depth = serializer.data["depth"]
        parent = serializer.data["parent"]

        if depth > 0 and parent != "":
            ParentChildComment.objects.create(
                parent=parent, child=serializer.data.get("id")
            )

        return Response(
            data={"success": "Comment was created successfully"},
            status=status.HTTP_201_CREATED,
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
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid()
        serializer.save()
        post = BasePost.objects.get(id=serializer.data["post_id"])
        owner = Profile.objects.get(id=serializer.data["owner"])
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
        url_path="remove",
        url_name="remove",
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
                data={"error": "Query failed! {}".format(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(data={"success": "User unliked"}, status=status.HTTP_200_OK)


class MemorizeViewSet(viewsets.ModelViewSet):
    serializer_class = MemorizedSerializer
    queryset = Memorize.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid()
        thread = Thread.objects.get(id=serializer.data["thread"])
        owner = Profile.objects.get(id=serializer.data["owner"])
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
        url_path="remove",
        url_name="remove",
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
    queryset = Tag.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
