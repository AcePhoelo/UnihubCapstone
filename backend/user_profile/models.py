from django.db import models
from django.contrib.auth.models import User
from django.apps import apps
from backend.storage import ProfilePictureStorage



class Student(models.Model):
    """
    Represents a student profile linked to a user account.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        verbose_name="User Account",
        help_text="The user account associated with this student."
    )
    full_name = models.CharField(
        max_length=100,
        verbose_name="Full Name",
        help_text="The full name of the student."
    )
    first_name = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name="First Name",
        help_text="The student's first name."
    )
    middle_name = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Middle Name(s)",
        help_text="The student's middle name(s). Optional."
    )
    last_name = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name="Last Name",
        help_text="The student's last name."
    )
    email = models.EmailField(
        unique=True,
        verbose_name="Email Address",
        help_text="The email address of the student."
    )
    studentid = models.CharField(
        max_length=20,
        unique=True,
        verbose_name="Student ID",
        help_text="The unique student ID."
    )
    profile_picture = models.ImageField(
        storage=ProfilePictureStorage(),
        upload_to='',
        null=True,
        blank=True,
        verbose_name="Profile Picture",
        help_text="The profile picture of the student."
    )
    badges = models.JSONField(
        default=list,
        blank=True,
        null=True,
        verbose_name="Badges",
        help_text="A list of badges earned by the student."
    )

    @property
    def clubsjoined(self):
        """
        Returns a queryset of clubs the student has joined.
        """
        Club = apps.get_model('clubs', 'Club')  # Use django.apps.apps.get_model
        return Club.objects.filter(clubmembership__student=self)

    @property
    def leadership_clubs(self):
        """
        Returns a queryset of clubs where the student is the president.
        """
        Club = apps.get_model('clubs', 'Club')  # Use django.apps.apps.get_model
        return Club.objects.filter(president=self)

    def save(self, *args, **kwargs):
        # Update full_name from component parts
        if not self.full_name or self._has_name_components_changed():
            parts = []
            if self.first_name:
                parts.append(self.first_name)
            if self.middle_name:
                parts.append(self.middle_name)
            if self.last_name:
                parts.append(self.last_name)
            
            if parts:  # Only join if there are parts to join
                self.full_name = " ".join(parts)
            else:
                self.full_name = ""  # Default to empty string if no name parts
                
        super().save(*args, **kwargs)

    def _has_name_components_changed(self):
        """Check if name components have changed compared to full_name"""
        if not self.pk:
            return True  # New instance
        
        try:
            old_instance = Student.objects.get(pk=self.pk)
            return (old_instance.first_name != self.first_name or
                    old_instance.middle_name != self.middle_name or
                    old_instance.last_name != self.last_name)
        except Student.DoesNotExist:
            return True

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Students"
        ordering = ['last_name', 'first_name']