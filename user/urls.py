from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView
)

router = DefaultRouter()

urlpatterns = [
    path("user-auth/token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_view"),
    path("user-auth/token/refresh", TokenRefreshView.as_view(), name="token_refresh_view")

    # path('/auth/', include("dj_rest_auth.urls"))      # For shortcut authentication setup
]