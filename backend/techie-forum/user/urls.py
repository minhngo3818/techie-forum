from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import (
    UserViewSet,
    UserRegisterView,
    EmailVerificationView,
    ChangeEmailView,
    RequestEmailVerificationView,
    LoginView,
    LogoutView,
    CsrfTokenView,
    CookieTokenRefreshView,
    CookieTokenVerifyView,
    RequestResetPasswordView,
    ResetPasswordView,
    ConfirmResetPasswordUrlView,
    ChangePasswordView,
    DeleteAccountView,
    ProfileViewSet,
    ProjectViewSet,
)

router = DefaultRouter()
router.register(r"user-view", UserViewSet)
router.register(r"profile-view", ProfileViewSet)
router.register(r"project-view", ProjectViewSet)

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
    path("user/csrf", CsrfTokenView.as_view(), name="user-csrf"),
    path("user/logout", LogoutView.as_view(), name="logout"),
    path("user/register", UserRegisterView.as_view(), name="user-register"),
    path(
        "user/email-verification",
        EmailVerificationView.as_view(),
        name="email-verification",
    ),
    path(
        "user/email-verification/request/<udsf>",
        RequestEmailVerificationView.as_view(),
        name="request-email-verification",
    ),
    path("user/change-email", ChangeEmailView.as_view(), name="email-change"),
    path("user/delete-account", DeleteAccountView.as_view(), name="delete-account"),
    path(
        "user/auth/refresh", CookieTokenRefreshView.as_view(), name="token-refresh-view"
    ),
    path(
        "user/auth/verify", CookieTokenVerifyView.as_view(), name="token-verification"
    ),
    path(
        "user/change-password",
        ChangePasswordView.as_view(),
        name="change-password",
    ),
    path(
        "user/password-reset-request",
        RequestResetPasswordView.as_view(),
        name="password-reset-request",
    ),
    path(
        "user/password-reset-confirm/<id>/<token>",
        ConfirmResetPasswordUrlView.as_view(),
        name="password-reset-confirm",
    ),
    path(
        "user/reset-password",
        ResetPasswordView.as_view(),
        name="reset-password",
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
