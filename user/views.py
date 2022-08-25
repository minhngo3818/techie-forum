from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User, Profile
from .serializers import CustomTokenObtainPairSerializer, ProfileSerializers


# Use custom API authentications for purpose of practice
# Read documentation for rest_framework authentication
# Documentation: https://www.django-rest-framework.org/api-guide/authentication/
# Tutorial: https://www.django-rest-framework.org/tutorial/4-authentication-and-permissions/

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
