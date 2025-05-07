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
    serializer_class = EventRegistrationSerializer
    pagination_class = EventRegistrationPagination
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering_fields = ['registered_at']
    ordering = ['-registered_at']

    def get_queryset(self):
        queryset = EventRegistration.objects.all()
        
        event_id = self.request.query_params.get('event_id')
        user_id = self.request.query_params.get('user_id')
        student_name = self.request.query_params.get('student_name')
        
        print(f"Query params - event_id: {event_id}, user_id: {user_id}, student_name: {student_name}")
        
        # Get all event registrations to debug
        all_registrations = EventRegistration.objects.all()
        print(f"All registrations in system: {all_registrations.count()}")
        for reg in all_registrations:
            print(f"Registration ID: {reg.id}, Event: {reg.event}, Student: {reg.student}, Student User ID: {reg.student.user_id}")
        
        if event_id:
            queryset = queryset.filter(event_id=event_id)
        
        # First try to filter by student name if provided
        if student_name:
            from user_profile.models import Student
            try:
                students = Student.objects.filter(
                    Q(user__first_name__icontains=student_name) | 
                    Q(user__last_name__icontains=student_name)
                )
                if students.exists():
                    queryset = queryset.filter(student__in=students)
                    print(f"Found {queryset.count()} registrations by student name")
                    return queryset
            except Exception as e:
                print(f"Error filtering by student name: {e}")
        
        # Then try user ID if no student name or no results
        if user_id:
            try:
                # Try multiple approaches to find the student
                from user_profile.models import Student
                
                # First, direct user ID match
                student_by_user = Student.objects.filter(user_id=user_id).first()
                if student_by_user:
                    queryset = queryset.filter(student=student_by_user)
                    print(f"Found student by user_id: {student_by_user}, registrations: {queryset.count()}")
                    return queryset
                
                # Try with student ID directly (some systems use student ID as user ID)
                student_by_id = Student.objects.filter(studentid=user_id).first()
                if student_by_id:
                    queryset = queryset.filter(student=student_by_id)
                    print(f"Found student by studentid: {student_by_id}, registrations: {queryset.count()}")
                    return queryset
                
                print(f"Could not find any student with user_id={user_id} or studentid={user_id}")
            except Exception as e:
                print(f"Error searching for student: {e}")
        
        print(f"Final query found {queryset.count()} registrations")
        return queryset

class EventParticipantsListView(generics.ListAPIView):
    """
    Allows any authenticated user to view the list of participants.
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

        # No permission check - all authenticated users can view participants
        return EventRegistration.objects.filter(event=event)
    
# Add this class to your views.py
class EventRegistrationDestroyView(generics.DestroyAPIView):
    """
    Allows event creators and club leaders to remove participants.
    """
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        registration_id = self.kwargs.get('pk')
        try:
            registration = EventRegistration.objects.get(id=registration_id)
        except EventRegistration.DoesNotExist:
            raise PermissionDenied("Registration not found.")
            
        # Check if user has permission to remove participants
        event = registration.event
        is_event_creator = event.created_by == self.request.user
        is_club_leader = event.club.president and event.club.president.user == self.request.user
        is_self_cancellation = registration.student.user == self.request.user  # Add this line
        
        # Update the condition to include self-cancellation
        if not (is_event_creator or is_club_leader or is_self_cancellation):
            raise PermissionDenied("You don't have permission to remove participants.")
            
        return registration