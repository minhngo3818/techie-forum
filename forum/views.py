from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.utils import timezone
from .models import Thread, Comment, Like, LikeComment, Tag
from .serializers import (
    ThreadSerializer,
    CommentSerializer,
    LikeSerializer,
    LikeCommentSerializer,
    TagSerializer,
)
from .pagination import ThreadPagination


class ThreadViewSet(viewsets.ModelViewSet):
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = ThreadPagination

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
        serializer.save(owner=self.request.user.profile, updated_date=timezone.now())


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(owner=self.request.user.profile)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.profile)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user.profile)


class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        thread = self.request.thread
        return Like.objects.filter(thread=thread)


class LikeCommentViewSet(viewsets.ModelViewSet):
    serializer_class = LikeCommentSerializer
    query_set = LikeComment.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        comment = self.request.comment
        return LikeComment.objects.filter(comment=comment)


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
