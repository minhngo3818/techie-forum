from django.db.models import Q
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
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
        category = self.request.query_params.get("category", None)

        if category:
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

        # Quest to before implement add memorize
        # Where should I place the update: Memorized view or Thread view
        # How can I perform the delete

        serializer.save(owner=self.request.user.profile, updated_at=timezone.now())


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
        return self.queryset

    def create(self, request, *args, **kwargs):
        post_id = request.data.get("post", None)
        pid = request.data.get("owner", None)
        print(post_id)
        print(pid)

        if not post_id or not pid:
            return Response({"error": "Failed to provide post id and profile id"})

        post = BasePost.objects.get(id=post_id)
        owner = Profile.objects.get(id=pid)
        liked, created = Like.objects.get_or_create(post=post, owner=owner)

        if created:
            return Response({"error": "Invalid action, double like"})

        post.liked.add(owner)

        return Response(data={"success": "like added to"})

    def destroy(self, request, *args, **kwargs):
        # TODO: figure out the way to overrid delete route by using pid and thid
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(data={"success": "deleted"})


class MemorizeViewSet(viewsets.ModelViewSet):
    serializer_class = MemorizedSerializer
    queryset = Memorize.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        thid = self.request.query_params.get("thid", None)
        pid = self.request.query_params.get("pid", None)

        if not thid or not pid:
            return Response(
                data={"error": "Failed to provide thread id and profile id"}
            )

        memorize, created = self.queryset.get_or_create(thread=thid, owner=pid)

        if created:
            return Response(data={"message": "The thread was memorized!"})

        Thread.objects.get(id=thid).add(liked=pid)

    def perform_destroy(self, instance):
        thid = self.request.query_params.get("thid", None)
        pid = self.request.query_params.get("pid", None)
        instance.delete(thread=thid, owner=pid)
        Thread.objects.get(thread=thid).remove(liked=pid)


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    query_set = Tag.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
