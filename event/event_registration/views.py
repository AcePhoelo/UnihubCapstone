from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import OrderingFilter
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q
from .models import EventRegistration
from .serializers import EventRegistrationSerializer
from event.add_event.models import Event

class EventRegistrationPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class EventRegistrationCreateView(generics.CreateAPIView):
    """
    Allows users to register for an event.
    """
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        event_id = self.request.data.get('event')
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            raise PermissionDenied("The event does not exist.")

        # Prevent duplicate registrations
        if EventRegistration.objects.filter(event=event, student=self.request.user.student).exists():
            raise PermissionDenied("You are already registered for this event.")

        serializer.save(student=self.request.user.student, event=event)

class EventRegistrationListView(generics.ListAPIView):
    """
    Lists all event registrations with optional filtering by event or user.
    """
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    pagination_class = EventRegistrationPagination
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering_fields = ['registered_at']
    ordering = ['-registered_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        event_id = self.request.query_params.get('event_id')
        user_id = self.request.query_params.get('user_id')

        if event_id:
            queryset = queryset.filter(event_id=event_id)
        if user_id:
            queryset = queryset.filter(student__user_id=user_id)

        return queryset

class EventParticipantsListView(generics.ListAPIView):
    """
    Allows the event creator or club president to view the list of participants.
    """
    serializer_class = EventRegistrationSerializer
    pagination_class = EventRegistrationPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        event_id = self.kwargs['event_id']
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            raise PermissionDenied("The event does not exist.")

        # Ensure the user is the event creator or the club president
        if event.created_by != self.request.user and event.club.president.user != self.request.user:
            raise PermissionDenied("You are not authorized to view the participants for this event.")

        return EventRegistration.objects.filter(event=event)