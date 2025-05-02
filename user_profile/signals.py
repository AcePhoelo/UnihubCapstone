from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Student

@receiver(post_save, sender=User)
def create_or_update_student_profile(sender, instance, created, **kwargs):
    # When a User is created, create a corresponding Student instance
    if created:
        Student.objects.create(
            user=instance,
            full_name=f"{instance.first_name} {instance.last_name}",
            email=instance.email,
            studentid=instance.username,  # Assuming username is the student ID
        )
    else:
        # When a User is updated, update the corresponding Student instance
        student = Student.objects.filter(user=instance).first()
        if student:
            student.full_name = f"{instance.first_name} {instance.last_name}"
            student.email = instance.email
            student.studentid = instance.username
            student.save()