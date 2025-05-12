import os
import django
import sys

# Add the project root to PYTHONPATH
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from clubs.models import Club, ClubMembership
from user_profile.models import Student
from event.add_event.models import Event
from django.contrib.auth.hashers import make_password

def populate_data():
    # Create Hans user
    hans_user, created = User.objects.get_or_create(
        username="21449723",
        defaults={
            "first_name": "Hans",
            "last_name": "Hartowidjojo",
            "email": "21449723@student.curtin.edu.au",
            "is_active": True,
            "password": make_password("Unihub+Capstone"),
        }
    )

    # Check if Hans student profile exists
    hans_student = Student.objects.filter(user=hans_user).first()

    # If Hans student ID is not 21449723, delete the old profile and create a new one
    if hans_student and hans_student.id != 21449723:
        old_id = hans_student.id

        # Update all references in the Club model
        Club.objects.filter(president_id=old_id).update(president_id=None)

        # Delete all references in the Member model
        ClubMembership.objects.filter(student_id=old_id).delete()

        # Delete the old student record
        hans_student.delete()

        # Create a new student record with the desired ID
        hans_student = Student.objects.create(
            id=21449723,
            user=hans_user,
            full_name="Hans Hartowidjojo",
            email="21449723@student.curtin.edu.au",
            studentid=hans_user.username,
            profile_picture="profile_pictures/Greatness_229.JPG"
        )

    # Create Evangeline user
    evangeline_user, created = User.objects.get_or_create(
        username="21716304",
        defaults={
            "first_name": "Evangeline",
            "last_name": "Tanoto",
            "email": "21716304@student.curtin.edu.au",
            "is_active": True,
            "password": make_password("CCSC+Capstone"),
        }
    )

    # Check if Evangeline student profile exists
    evangeline_student = Student.objects.filter(user=evangeline_user).first()

    # If Evangeline student ID is not 21716304, delete the old profile and create a new one
    if evangeline_student and evangeline_student.id != 21716304:
        old_id2 = evangeline_student.id

        # Update all references in the Club model
        Club.objects.filter(president_id=old_id2).update(president_id=None)

        # Delete all references in the Member model
        ClubMembership.objects.filter(student_id=old_id2).delete()

        # Delete the old student record
        evangeline_student.delete()

        # Create a new student record with the desired ID
        evangeline_student = Student.objects.create(
            id=21716304,
            user=evangeline_user,
            full_name="Evangeline Tanoto",
            email="21716304@student.curtin.edu.au",
            studentid=evangeline_user.username,
            profile_picture="profile_pictures/leader2.jpeg"
        )

    # Create Board Game Club
    board_game_club, _ = Club.objects.update_or_create(
        id=1,
        name="Board Game Club",
        defaults={
            "description": "A club where everyone can come and join to play board games and destress",
            "president_id": hans_student.id,  # Use the updated ID
            "logo": "club_logos/board-banner_fmCaakc.png",
            "banner": "club_banners/board-banner.png"
        }
    )

    # Create Curtin Singapore Community Service Club
    community_service_club, _ = Club.objects.update_or_create(
        id=2,
        name="Curtin Singapore Community Service Club",
        defaults={
            "description": "A club where students can volunteer to help out the Singapore community",
            "president_id": evangeline_student.id,  # Use the updated ID
            "logo": "club_logos/ccsc-banner_J72zRsp.png",
            "banner": "club_banners/ccsc-banner.png"
        }
    )

    # Add Hans and Eva as members of their respective clubs
    ClubMembership.objects.get_or_create(
        student=hans_student,
        club=board_game_club,
        defaults={"position": "President"}
    )

    ClubMembership.objects.get_or_create(
        student=evangeline_student,
        club=community_service_club,
        defaults={"position": "President"}
    )

    # Create sample events for the clubs
    Event.objects.update_or_create(
        name="Board Games Night",
        defaults={
            "description": "An exciting evening of board games and fun!",
            "date": "2025-04-25",
            "time": "18:00:00",
            "location": "Curtin Singapore, Room 101",
            "banner": "event_banners/board_games_night.png",
            "created_by": hans_user,
            "club": board_game_club,
        }
    )

    Event.objects.update_or_create(
        name="Community Service Day",
        defaults={
            "description": "A day dedicated to giving back to the community.",
            "date": "2025-05-01",
            "time": "09:00:00",
            "location": "Curtin Singapore, Community Hall",
            "banner": "event_banners/community_service_day.png",
            "created_by": evangeline_user,
            "club": community_service_club,
        }
    )
    # Create 10 dummy users
    for i in range(1, 11):
        student_id = f"21{str(100000 + i).zfill(6)}"  # Generate student ID like 21XXXXXX
        email = f"{student_id}@student.curtin.edu.au"  # Generate email based on student ID
        
        # Convert student_id to integer for primary key
        student_id_int = int(student_id)
        
        # Create or update user
        dummy_user, created = User.objects.get_or_create(
            username=student_id,
            defaults={
                "first_name": f"Dummy{i}",
                "last_name": "User",
                "email": email,
                "is_active": True,
                "password": make_password("dummy_password"),
            }
        )

        # Check if student profile exists
        dummy_student = Student.objects.filter(user=dummy_user).first()

        # If student exists but ID doesn't match desired ID, recreate it
        if dummy_student and dummy_student.id != student_id_int:
            old_id = dummy_student.id
            
            # Update all references in the Club model
            Club.objects.filter(president_id=old_id).update(president_id=None)
            
            # Delete all references in the Member model
            ClubMembership.objects.filter(student_id=old_id).delete()
            
            # Delete the old student record
            dummy_student.delete()
            
            # Create a new student record with the desired ID
            dummy_student = Student.objects.create(
                id=student_id_int,  # Set primary key explicitly
                user=dummy_user,
                full_name=f"Dummy User {i}",
                email=email,
                studentid=student_id,
                profile_picture=None,
            )
        # If student doesn't exist, create it with the desired ID
        elif not dummy_student:
            dummy_student = Student.objects.create(
                id=student_id_int,  # Set primary key explicitly
                user=dummy_user,
                full_name=f"Dummy User {i}",
                email=email,
                studentid=student_id,
                profile_picture=None,
            )

        # Assign the first 5 dummy users to the Board Game Club
        if i <= 5:
            ClubMembership.objects.get_or_create(
                student=dummy_student,
                club=board_game_club,
                defaults={"position": "Member"}
            )
        # Assign the remaining 5 dummy users to the Community Service Club
        else:
            ClubMembership.objects.get_or_create(
                student=dummy_student,
                club=community_service_club,
                defaults={"position": "Member"}
            )

        print("Data populated successfully!")

if __name__ == "__main__":
    populate_data()