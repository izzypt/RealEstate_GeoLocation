from django.contrib import admin
from listings.models import Listing
from .forms import ListingForm

class ListingAdmin(admin.ModelAdmin):
	form = ListingForm


admin.site.register(Listing, ListingAdmin)