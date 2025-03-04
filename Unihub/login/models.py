from django.db import models
from django.core.validators import RegexValidator

# Create your models (database) here.
class Account(models.Model):
    student_id = models.CharField(
        max_length=8,
        unique=True,
        validators=[RegexValidator(regex=r'^\d{8}$', message='Student ID must be 8 digits')]

    )
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=128)  # Use a larger max_length for hashed passwords

    # This is a string representation of the accounts
    def __str__(self):
        return(f"{self.student_id}")
    