from rest_framework import serializers
from .models import Profile
from listings.models import Listing
from listings.serializers import listingSerializer


class ProfileSerializer(serializers.ModelSerializer):
    profile_owner_listings = serializers.SerializerMethodField()

    def get_profile_owner_listings(self, obj):
        listings = Listing.objects.filter(seller=obj.profile_owner)
        listing_serialized = listingSerializer(listings, many=True)
        return listing_serialized.data

    class Meta:
        model = Profile
        fields = '__all__'