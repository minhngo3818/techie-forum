from django.contrib import admin
from .models import User, Profile, Project

# Register your models here.
admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Project)
