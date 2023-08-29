from django.contrib import admin
from .models import Thread, Comment, ParentChildComment, Like, Mark, Tag, Image

# Register your models here.
admin.site.register(Thread)
admin.site.register(Comment)
admin.site.register(ParentChildComment)
admin.site.register(Mark)
admin.site.register(Like)
admin.site.register(Tag)
admin.site.register(Image)
