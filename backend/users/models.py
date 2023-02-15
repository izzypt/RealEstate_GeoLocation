from django.db import models
from django.contrib.auth.models import AbstractUser



# Create your models here.
class User(AbstractUser):
	email = models.EmailField(unique=True)
  
class Profile(models.Model):
	profile_owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile_owner', null=True, blank=True)
	agency_name = models.CharField(max_length=100, null=True, blank=True)
	phone_number = models.CharField(max_length=100, null=True, blank=True)
	bio = models.TextField(max_length=1000, null=True, blank=True)
	picture = models.ImageField(upload_to='profile_pics/%Y/%m/%d/', null=True, blank=True)

	def __str__(self):
		return f"Profile of {self.profile_owner.username}"
 