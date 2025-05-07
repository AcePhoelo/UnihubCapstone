from rest_framework import generics
from event.add_event.models import Event
from .serializers import CalendarEventSerializer

class CalendarEventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = CalendarEventSerializer