from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import (
    UserViewSet,
    UserRegisterView,
    EmailVerificationView,
    LoginView,
    LogoutView,
    RequestResetPasswordView,
    ResetPasswordView,
    ConfirmResetPasswordUrlView,
    ProfileViewSet,
    ChangePasswordView,
)

router = DefaultRouter()
router.register(r"user-view", UserViewSet)
router.register(r"profile-view", ProfileViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="Techies Forum API",
        default_version="v1",
        description="REST API Techies Forum",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="dummycontatc@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    path("", include(router.urls)),
    path("user/login", LoginView.as_view(), name="login"),
    path("user/logout", LogoutView.as_view(), name="logout"),
    path("user/register/", UserRegisterView.as_view(), name="user_register"),
    path(
        "user/email-verification",
        EmailVerificationView.as_view(),
        name="email-verification",
    ),
    path("user/auth/refresh", TokenRefreshView.as_view(), name="token_refresh_view"),
    path("user/auth/verify", TokenVerifyView.as_view(), name="token_verification"),
    path(
        "user/auth/change-password/<str:pk>",
        ChangePasswordView.as_view(),
        name="change_password",
    ),
    path(
        "user/password-reset-request",
        RequestResetPasswordView.as_view(),
        name="password-reset-request",
    ),
    path(
        "user/password-reset-confirm/<uidb64>/<token>",
        ConfirmResetPasswordUrlView.as_view(),
        name="password-reset-confirm",
    ),
    path(
        "user/password-reset-complete",
        ResetPasswordView.as_view(),
        name="password-reset-complete",
    ),
    # drf swagger ui
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
    # path('/auth/', include("dj_rest_auth.urls"))      # For reducing authentication implementation in serializers
]
