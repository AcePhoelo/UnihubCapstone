from rest_framework.generics import ListAPIView
from event.add_event.models import Event
from .serializers import EventListSerializer
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from event.add_event.serializers import EventSerializer

class EventListView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventListSerializer

class ClubEventsView(ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        club_id = self.request.query_params.get('club_id')
        if club_id:
            return Event.objects.filter(club_id=club_id).order_by('date')
        return Event.objects.none()