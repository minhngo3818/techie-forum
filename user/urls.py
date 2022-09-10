from django.urls import path, re_path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
router.register(r"user-list", views.UserViewSet)
router.register(r"profile-list", views.ProfileViewSet, basename="profile_view_set")

schema_view = get_schema_view(
    openapi.Info(
        title="Techies Forum API",
        default_version="v1",
        description="API for admin to view data in Techies Forum",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="dummycontatc@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    path("", include(router.urls)),
    path("user/register/", views.UserRegisterView.as_view(), name="user_register"),
    path(
        "user/auth/",
        views.CustomTokenObtainPairView.as_view(),
        name="token_obtain_view",
    ),
    path("user/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh_view"),
    path("user/auth/verify/", TokenVerifyView.as_view(), name="token_verification"),
    path(
        "user/auth/change-password/<str:pk>/",
        views.ChangePasswordView.as_view(),
        name="change_password",
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
