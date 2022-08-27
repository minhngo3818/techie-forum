from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from django.conf import settings
from .views import (
    ThreadViews,
    CommentViews,
    LikeViews,
    LikeCommentViews,
    TagViews
)

router = DefaultRouter()
# Register url here
router.register(r"thread", ThreadViews)
router.register(r"comment", CommentViews)
router.register(r"like", LikeViews)
router.register(r"like-comment", LikeCommentViews, basename="like-comment")
router.register(r"tag", TagViews, basename="tag")

urlpatterns = [
    path("", include(router.urls))
]
