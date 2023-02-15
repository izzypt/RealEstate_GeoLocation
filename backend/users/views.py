from django.shortcuts import render
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework import generics

# Create your views here.
class ProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer    