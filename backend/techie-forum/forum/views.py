from django.utils import timezone
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework import status
from user.models import Profile
from .models import (
    BasePost,
    Thread,
    Comment,
    Like,
    Memorize,
    ParentChildComment,
    Tag,
    Image,
)
from .serializers import (
    ThreadSerializer,
    CommentSerializer,
    LikeSerializer,
    MemorizedSerializer,
    TagSerializer,
    ImageSerializer,
)
from .pagination import PaginationHelper


class ThreadViewSet(viewsets.ModelViewSet):
    """
    Fetch to view and manage thread
    """

    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper
    lookup_field = "id"

    def get_queryset(self):
        category = self.request.query_params.get("category", "")

        if category != "":
            return self.queryset.filter(category=category)

        return self.queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profile)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user.profile, updated_at=timezone.now())

    # Remove thread: perform pseudo remove by setting inactive thread
    @action(methods=["patch"], detail=True, url_path="remove", url_name="remove")
    def remove_thread(self, request, pk):
        thread = self.get_object()
        thread.is_active = False
        thread.save()
        return Response({"success": "thread was removed successfully."})

    # Recover thread: bring back thread to view if request
    @action(methods=["patch"], detail=True, url_path="recover", url_name="recover")
    def recover_thread(self, request, pk):
        thread = self.get_object()
        thread.is_active = True
        thread.save()
        return Response({"success": "thread was recovered successfully."})


class CommentViewSet(viewsets.ModelViewSet):
    """
    Fetch to view and manage comment
    """

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper

    def filter_queryset(self, queryset):
        thid = self.request.query_params.get("thid", None)
        pcid = self.request.query_params.get("pcid", None)

        if thid and pcid:
            child_comment_ids = ParentChildComment.objects.filter(parent=pcid).values(
                "child"
            )
            return queryset.filter(cmt_thread=thid, id__in=child_comment_ids)

        if thid:
            return queryset.filter(cmt_thread=thid, depth=0)

        return queryset

    def perform_destroy(self, instance):
        related_instance = ParentChildComment.objects.get(child=instance.id)
        related_instance.delete()
        instance.delete()


class LikeViewSet(viewsets.ModelViewSet):
    """
    Fetch to perform like and unlike
    """

    serializer_class = LikeSerializer
    queryset = Like.objects.all()
    permission_classes = [IsAuthenticated]
    filter_fields = ("pid", "post_id")

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid()
        serializer.save()
        post = BasePost.objects.get(id=serializer.data["post_id"])
        owner = Profile.objects.get(id=serializer.data["owner"])
        liked, created = Like.objects.get_or_create(post=post, owner=owner)

        if created:
            return Response(
                {"error": "Invalid action, double like"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        post.liked.add(owner)

        return Response(
            data={"success": "Post was liked"}, status=status.HTTP_201_CREATED
        )

    @action(
        methods=["delete"],
        detail=False,
        url_path="remove",
        url_name="remove",
    )
    def remove_like(self, request):
        post_id = request.query_params.get("post_id", "")
        pid = request.query_params.get("pid", "")

        if post_id == "" or pid == "":
            return Response(
                data={"error": "Query params must contain post_id and pid!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            post = BasePost.objects.get(id=post_id)
            owner = Profile.objects.get(id=pid)
            instance = self.queryset.get(post=post_id, owner=pid)
            instance.delete()
            post.liked.remove(owner)

        except Exception as e:
            return Response(
                data={"error": "Query failed! {}".format(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(data={"success": "User unliked"}, status=status.HTTP_200_OK)


class MemorizeViewSet(viewsets.ModelViewSet):
    """
    Fetch to memorize a thread
    """

    serializer_class = MemorizedSerializer
    queryset = Memorize.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid()
        thread = Thread.objects.get(id=serializer.data["thread"])
        owner = Profile.objects.get(id=serializer.data["owner"])
        memorize, created = self.queryset.get_or_create(thread=thread, owner=owner)

        if created:
            return Response(
                data={"message": "The thread was memorized!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        thread.memorized.add(owner)

        return Response(
            data={"success": "Thread was memorized"}, status=status.HTTP_201_CREATED
        )

    @action(
        methods=["delete"],
        detail=False,
        url_path="remove",
        url_name="remove",
    )
    def remove_memorize(self, request):
        tid = request.query_params.get("tid", "")
        pid = request.query_params.get("pid", "")

        if tid == "" or pid == "":
            return Response(
                data={"error": "Query params must contain tid and pid"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            thread = BasePost.objects.get(id=tid)
            owner = Profile.objects.get(id=pid)
            instance = self.queryset.get(thread=thread, owner=pid)
            instance.delete()
            thread.memorized.remove(owner)

        except Exception as e:
            return Response(
                data={"error": "Query failed {}".format(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(data={"success": "User was unliked"}, status=status.HTTP_200_OK)


class TagViewSet(viewsets.ModelViewSet):
    """
    Fetch to view and manage tags
    """

    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper


class ImageViewSet(viewsets.ModelViewSet):
    """
    Fetch to view and manage post images
    """

    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationHelper
