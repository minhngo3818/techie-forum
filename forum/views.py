from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone

from .models import Thread, Comment, Like, LikeComment
from .serializers import ThreadSerializer, CommentSerializer, LikeSerializer, LikeCommentSerializer


class ThreadViews(viewsets.ModelViewSet):
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Thread.objects.filter(owner=user)


class CommentViews(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Comment.objects.filter(owner=user)


class LikeViews(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

    def get_queryset(self):
        thread = self.request.thread
        return Like.objects.filter(thread=thread)


class LikeCommentViews(viewsets.ModelViewSet):
    serializer_class = LikeCommentSerializer
    query_set = LikeComment.objects.all()

    def get_queryset(self):
        comment = self.request.comment
        return LikeComment.objects.filter(comment=comment)

