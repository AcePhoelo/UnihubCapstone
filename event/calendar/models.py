from django.db import models
from event.add_event.models import Event

class ClubEventPage(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='calendar_page')

    def __str__(self):
        return self.event.name
    
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Event)
def create_club_event_page(sender, instance, created, **kwargs):
    if created:
        ClubEventPage.objects.create(event=instance)