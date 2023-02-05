# from django import forms
# from .models import Listing
# from django.contrib.gis.geos import Point

# class ListingForm(forms.ModelForm):
#     class Meta:
#         # We add to 2 new fields to the form that don't exist on the model
#         model = Listing
#         fields = ['title', 'location','description','area','borough','listing_type','property_status','price','rental_frequency','rooms','furnished','pool',
#         'pool','elevator','cctv','parking','date_posted', 'latitude', 'longitude', 'picture']
#     latitude = forms.FloatField()
#     longitude = forms.FloatField()

#     def clean(self):
#         data = super().clean()
#         latitude = data.pop('latitude')
#         longitude = data.pop('longitude')
#         data['location'] = Point(latitude, longitude, srid=4326)
#         return data

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         location = self.initial.get('location')
#         if isinstance(location, Point):
#             self.initial['latitude'] = location.tuple[0]
#             self.initial['longitude'] = location.tuple[1]
