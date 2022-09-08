from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)

router = DefaultRouter()
router.register(r"user-list", views.UserViewSet)
router.register(r"profile-list", views.ProfileViewSet, basename="profile_view_set")

urlpatterns = [
    path("", include(router.urls)),
    path("user/register/", views.UserRegisterView.as_view(), name="user_register"),
    path("user/auth/login/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_view"),
    path("user/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh_view"),
    path("user/auth/verify/", TokenVerifyView.as_view(), name="token_verification")
    # path('/auth/', include("dj_rest_auth.urls"))      # For shortcut authentication setup
]