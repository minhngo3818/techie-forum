from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from django.conf import settings
from .views import (
    ThreadViewSet,
    CommentViewSet,
    LikeViewSet,
    LikeCommentViewSet,
    TagViewSet,
)

router = DefaultRouter()
# Register url here
router.register(r"thread", ThreadViewSet)
router.register(r"comment", CommentViewSet)
router.register(r"like", LikeViewSet)
router.register(r"like-comment", LikeCommentViewSet, basename="like-comment")
router.register(r"tag", TagViewSet, basename="tag")

urlpatterns = [path("forum/", include(router.urls))]
