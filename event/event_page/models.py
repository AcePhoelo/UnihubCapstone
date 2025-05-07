from django.db import models
from event.add_event.models import Event

class ClubEventPage(models.Model):
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name="event_page")  # One-to-one relationship with Event

    def __str__(self):
        return self.event.name

# Automatically create a ClubEventPage when an Event is created
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Event)
def create_club_event_page(sender, instance, created, **kwargs):
    if created:
        ClubEventPage.objects.create(event=instance)