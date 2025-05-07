import os
import django
import sys

# Add the project root to PYTHONPATH
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from clubs.models import Club, ClubMembership, Member
from user_profile.models import Student
from event.add_event.models import Event

def clear_database():
    """
    Erase all data from the database except for User 87654321 and their related data.
    """
    print("Clearing database except for User 87654321...")

    # Get the user to exclude
    excluded_user = User.objects.filter(username="87654321").first()

    if excluded_user:
        # Get the student profile associated with the excluded user
        excluded_student = Student.objects.filter(user=excluded_user).first()

        # Delete all ClubMembership records except those related to the excluded student
        if excluded_student:
            ClubMembership.objects.exclude(student=excluded_student).delete()

        # Delete all Club records (this will cascade delete related memberships and events)
        Club.objects.all().delete()

        # Delete all Event records
        Event.objects.all().delete()

        # Delete all Student records except the excluded student
        Student.objects.exclude(id=excluded_student.id).delete()

        # Delete all User records except the excluded user
        User.objects.exclude(id=excluded_user.id).delete()

        print("Database cleared successfully, except for User 87654321 and their related data.")
    else:
        print("User 87654321 not found. Clearing entire database...")
        # If the user doesn't exist, clear everything
        ClubMembership.objects.all().delete()
        Club.objects.all().delete()
        Event.objects.all().delete()
        Student.objects.all().delete()
        User.objects.all().delete()