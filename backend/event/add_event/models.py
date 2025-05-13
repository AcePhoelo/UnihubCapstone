from django.db import models
from django.contrib.auth.models import User
from clubs.models import Club
from backend.storage import EventBannerStorage


class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=100)
    banner = models.ImageField(storage=EventBannerStorage(),upload_to='', null=True, blank=True, verbose_name="Event Banner", help_text="The banner image of the event.")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events")  # User who created the event
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="events", default=1)  # Club the event belongs to

    def __str__(self):
        return self.name