from django.db.models import Q
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.utils import timezone
from .models import Thread, Comment, ParentChildComment, Like, Memorize, Tag
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
        return Thread.objects.filter(category=self.request.query_params.get("category"))

    def create(self, request, *args, **kwargs):
        tag_names = request.data.get("tags", [])
        for name in tag_names:
            Tag.objects.get_or_create(name=name)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user.profile)
        return Response(serializer.data)

    def perform_update(self, serializer):
        #TODO: Add query to remove tags are not contained in the request
        serializer.save(owner=self.request.user.profile, updated_date=timezone.now())


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper

    def get_queryset(self):
        thread_id = self.request.GET.get("thid", "")
        parent_id = self.request.GET.get("pcid", "")
        depth = self.request.GET.get("depth", 0)
        comment_pairs = ParentChildComment.objects.filter(parent=parent_id)

        return Comment.objects.filter(
            Q(id=comment_pairs.child | None),
            _thread=thread_id,
            depth=depth,
        ).defer("content")

    def perform_create(self, serializer):
        thread_id = self.request.POST.get("thid", "")
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

    def get_queryset(self):
        thread = self.request.thread
        return Like.objects.filter(thread=thread)


class MemorizeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Memorize.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        thread = self.request.thread
        return Memorize.objects.filter(thread=thread)


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    query_set = Tag.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tag.objects.all()

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save(updated_date=timezone.now())
