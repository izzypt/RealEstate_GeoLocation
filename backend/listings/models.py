from django.utils import timezone
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Listing(models.Model):
    #location = models.PointField(blank=True, null=True, srid=4326) #SRID stands for spatial reference Identifier
    title = models.CharField(max_length=50)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    choices_area = (
        ('Lisboa Centro', 'Lisboa Centro'),
        ('Lisboa Oeste', 'Lisboa Oeste'),
        ('Lisboa Este', 'Lisboa Este'),
    )
    area = models.CharField(max_length=20, blank=True, null=True, choices=choices_area)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    borough = models.CharField(max_length=50, blank=True, null=True)
    choices_listing_type = (
        ('House', 'House'),
        ('Apartment', 'Apartment'),
        ('Office', 'Office'),
    )
    listing_type = models.CharField(max_length=20, choices=choices_listing_type)
    choices_property_status = (
        ('Sale', 'Sale'),
        ('Rent', 'Rent'),
    )
    property_status = models.CharField(max_length=20, blank=True, null=True, choices=choices_property_status)
    price = models.DecimalField(max_digits=50, decimal_places=0)
    choices_rental_frequency = (
        ('Month','Month'),
        ('Week', 'Week'),
        ('Day', 'Day')
    )
    rental_frequency = models.CharField(max_length=20, blank=True, null=True, choices=choices_rental_frequency)
    rooms = models.IntegerField(blank=True, null=True)
    furnished = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    elevator = models.BooleanField(default=False)
    cctv = models.BooleanField(default=False)
    parking = models.BooleanField(default=False)
    picture = models.ImageField(null=True, blank=True)
    picture2 = models.ImageField(null=True, blank=True)
    date_posted = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return self.title
