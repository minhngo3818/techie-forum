from rest_framework.pagination import CursorPagination


class ThreadPagination(CursorPagination):
    page_size = 5
    page_size_query_param = "size"
    ordering = "-created_date"
