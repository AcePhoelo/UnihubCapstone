from django.db import models
from django.contrib.auth.models import User
from django.apps import apps


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
        upload_to='profile_pictures/',
        null=True,
        blank=True,
        verbose_name="Profile Picture",
        help_text="The profile picture of the student."
    )
    badges = models.JSONField(
        default=list,
        blank=True,
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

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Students"
        ordering = ['full_name']