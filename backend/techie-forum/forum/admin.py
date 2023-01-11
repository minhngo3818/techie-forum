from django.contrib import admin
from .models import Thread, Comment, ParentChildComment, Like, Tag

# Register your models here.
admin.site.register(Thread)
admin.site.register(Comment)
admin.site.register(ParentChildComment)
admin.site.register(Like)
admin.site.register(Tag)
