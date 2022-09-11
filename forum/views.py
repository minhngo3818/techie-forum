from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Thread, Comment, Like, LikeComment, Tag
from .serializers import (
    ThreadSerializer,
    CommentSerializer,
    LikeSerializer,
    LikeCommentSerializer,
    TagSerializer,
)


class ThreadViewSet(viewsets.ModelViewSet):
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Thread.objects.filter(owner=self.request.user.profile)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.profile)

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
        thread = self.request.thread
        return Tag.objects.filter(thread=thread)

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save(updated_date=timezone.now())
