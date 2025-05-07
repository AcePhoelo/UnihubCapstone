from django.db import models

# Create your models here.
class Club(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    president = models.CharField(max_length=100, null=True, blank=True)  # Allow null values temporarily

    def __str__(self):
        return self.name


class Member(models.Model):
    POSITION_CHOICES = [
        ('Member', 'Member'),
        ('Executive Committee', 'Executive Committee'),
        ('Head of Department', 'Head of Department'),
        ('Treasurer', 'Treasurer'),
        ('Secretary', 'Secretary'),
        ('Vice President', 'Vice President'),
        ('President', 'President'),
    ]

    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='members')  # Link to Club
    name = models.CharField(max_length=100)  # Student Name
    student_id = models.CharField(max_length=20, unique=True)  # Student ID (unique for each student)
    position = models.CharField(max_length=50, choices=POSITION_CHOICES, default='Member')  # Predefined positions
    custom_position = models.CharField(max_length=100, null=True, blank=True)  # Custom position added by presidents

    def __str__(self):
        # Display the custom position if it exists, otherwise the predefined position
        return f"{self.name} ({self.custom_position or self.position})"