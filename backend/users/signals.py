from .models import Profile
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
user = get_user_model()

@receiver(post_save, sender=user)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(profile_owner=instance)

@receiver(post_save, sender=user)
def save_user_profile(sender, instance, **kwargs):
    instance.profile_owner.save()