from django.db import models
from event.add_event.models import Event
from user_profile.models import Student

class Feedback(models.Model):
    ROLE_CHOICES = [
        ('Organizer', 'Organizer'),
        ('Volunteer', 'Volunteer'),
        ('Participant', 'Participant'),
    ]

    SATISFACTION_CHOICES = [
        ('Satisfied', 'Satisfied'),
        ('Fine', 'Fine'),
        ('Unsatisfied', 'Unsatisfied'),
    ]

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='feedbacks', default=1)  # Student giving the feedback
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='feedbacks')  # Add this line
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="Participant")  # Role of the participant
    like = models.TextField(default="No likes provided")  # What they liked
    dislike = models.TextField(default="No dislikes provided")  # What they disliked
    satisfaction = models.CharField(max_length=50, choices=SATISFACTION_CHOICES, default="Fine")  # Satisfaction level
    experience = models.TextField(default="No experience provided")  # Additional feedback

    def __str__(self):
        return f"{self.student.full_name} - {self.event.name}"