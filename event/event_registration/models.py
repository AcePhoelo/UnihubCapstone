from django.db import models
from event.add_event.models import Event
from user_profile.models import Student

class EventRegistration(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="registrations", default=1)  # Registered student
    role = models.CharField(max_length=50)  # Role of the participant (e.g., Organizer, Volunteer, Participant)
    registered_at = models.DateTimeField(auto_now_add=True)  # Timestamp of registration
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registrations", default=1)  # Event being registered for

    def __str__(self):
        return f"{self.student.full_name} ({self.student.studentid}) - {self.event.name}"