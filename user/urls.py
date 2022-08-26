from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView
)

router = DefaultRouter()

urlpatterns = [
    path("register/", views.UserRegisterView.as_view(), name="user-register"),
    path("auth/login/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_view"),
    path("auth/login/refresh/", TokenRefreshView.as_view(), name="token_refresh_view")

    # path('/auth/', include("dj_rest_auth.urls"))      # For shortcut authentication setup
]