from django.shortcuts import render
from .serializers import listingSerializer
from .models import Listing
from rest_framework import generics

# Create your views here.
class ListingList(generics.ListAPIView):
    queryset = Listing.objects.all().order_by('-date_posted')
    serializer_class = listingSerializer
    
class ListingCreate(generics.CreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = listingSerializer
    
class ListingDetail(generics.RetrieveAPIView):
    queryset = Listing.objects.all()
    serializer_class = listingSerializer
    
class ListingDelete(generics.DestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = listingSerializer