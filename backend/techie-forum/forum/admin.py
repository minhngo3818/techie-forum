from django.contrib import admin
from .models import Thread, Comment, Like, Tag

# Register your models here.
admin.site.register(Thread)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Tag)
