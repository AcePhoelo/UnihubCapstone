from rest_framework import serializers
from event.add_event.models import Event

class EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'date', 'time', 'location']

