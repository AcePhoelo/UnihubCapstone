from rest_framework import serializers
from event.add_event.models import Event

class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'date', 'time', 'name', 'location']
