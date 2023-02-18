from rest_framework import serializers
from .models import Listing

class listingSerializer(serializers.ModelSerializer):
    seller_username = serializers.SerializerMethodField()
    seller_agency_name = serializers.SerializerMethodField()

    class Meta:
        model = Listing
        fields = '__all__' 
        
    def get_seller_username(self, obj):
        return obj.seller.username
    
    def get_seller_agency_name(self, obj):
        return obj.seller.profile_owner.agency_name
