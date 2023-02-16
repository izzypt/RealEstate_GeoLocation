from django.shortcuts import render
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework import generics

# Create your views here.
class ProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'profile_owner'

class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer       
    
class ProfileUpdateView(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'profile_owner'
    
    def update(self, request, *args, **kwargs):
        print(request.data)  # add this line
        return super().update(request, *args, **kwargs)