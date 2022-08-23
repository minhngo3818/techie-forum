from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, Profile


@api_view(["GET"])
def getTokenRoutes(request):
    tokenRoutes = [
        ""
    ]
