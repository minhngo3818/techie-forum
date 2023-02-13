from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    ThreadViewSet,
    CommentViewSet,
    LikeViewSet,
    MemorizeViewSet,
    TagViewSet,
    ImageViewSet,
)

router = DefaultRouter()
# Register url here
router.register(r"thread", ThreadViewSet)
router.register(r"comment", CommentViewSet)
router.register(r"like", LikeViewSet)
router.register(r"memorize", MemorizeViewSet, basename="memorize")
router.register(r"tag", TagViewSet, basename="tag"),
router.register(r"image", ImageViewSet)

urlpatterns = [path("forum/", include(router.urls))]
