from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone

from .models import Thread, Comment, Like, LikeComment
from .serializers import ThreadSerializers, CommentSerializers, LikeSerializers, LikeCommentSerializers


class ThreadViews(viewsets.ModelViewSet):
    serializer_class = ThreadSerializers
    queryset = Thread.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


class CommentViews(viewsets.ModelViewSet):
    serializer_class = CommentSerializers
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)




