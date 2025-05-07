from django.db.models.signals import post_save
from django.dispatch import receiver
from event.add_event.models import AddEvent
from .models import ClubEventPage

@receiver(post_save, sender=AddEvent)
def create_event_page(sender, instance, created, **kwargs):
    if created:
        ClubEventPage.objects.create(event=instance)
