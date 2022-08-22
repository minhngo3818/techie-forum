from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from django.conf import settings
from .views import ThreadViews, CommentViews

router = DefaultRouter()
# Register url here
router.register(r"thread", ThreadViews)
router.register(r"comment", CommentViews)


urlpatterns = [
    path("forum/", include(router.urls))
]
