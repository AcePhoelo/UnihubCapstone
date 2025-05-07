from rest_framework.generics import ListAPIView
from event.add_event.models import Event
from .serializers import EventListSerializer

class EventListView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventListSerializer