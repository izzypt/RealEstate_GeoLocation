from django.shortcuts import render
from .serializers import listingSerializer
from .models import Listing
from rest_framework import generics

# Create your views here.
class ListingList(generics.ListAPIView):
    queryset = Listing.objects.all()
    serializer_class = listingSerializer