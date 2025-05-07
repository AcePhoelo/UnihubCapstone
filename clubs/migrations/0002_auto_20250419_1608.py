from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_users_and_students(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    Student = apps.get_model('user_profile', 'Student')  # Adjusted to match the correct app name
    Club = apps.get_model('clubs', 'Club')
    Member = apps.get_model('clubs', 'Member')

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

    # Create Hans student profile
    hans_student, _ = Student.objects.update_or_create(
        user=hans_user,
        defaults={
            "full_name": "Hans Hartowidjojo",
            "email": "21449723@student.curtin.edu.au",
            "studentid": hans_user.username,  # Use the username as the student ID
            "profile_picture": "profile_pictures/Greatness_229.JPG"
        }
    )

    # Create Evangeline student profile
    evangeline_student, _ = Student.objects.update_or_create(
        user=evangeline_user,
        defaults={
            "full_name": "Evangeline Tanoto",
            "email": "21716304@student.curtin.edu.au",
            "studentid": evangeline_user.username,  # Use the username as the student ID
            "profile_picture": "profile_pictures/leader2.jpeg"
        }
    )

    # Create Board Game Club
    board_game_club, _ = Club.objects.update_or_create(
        name="Board Game Club",
        defaults={
            "description": "A club where everyone can come and join to play board games and destress",
            "president": hans_student,  # Set the president as the Hans student object
            "logo": "club_logos/board_game_club_logo.png"
        }
    )

    # Create Curtin Singapore Community Service Club
    community_service_club, _ = Club.objects.update_or_create(
        name="Curtin Singapore Community Service Club",
        defaults={
            "description": "A club where students can volunteer to help out the Singapore community",
            "president": evangeline_student,  # Set the president as the Evangeline student object
            "logo": "club_logos/community_service_club_logo.png"
        }
    )

    # Add Hans and Evangeline as members of their respective clubs
    hans_member, _ = Member.objects.update_or_create(
        student=hans_student,
        defaults={
            "position": "President",
        }
    )
    hans_member.clubs.set([board_game_club])

    evangeline_member, _ = Member.objects.update_or_create(
        student=evangeline_student,
        defaults={
            "position": "President",
        }
    )
    evangeline_member.clubs.set([community_service_club])

def reverse_users_and_students(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    Student = apps.get_model('user_profile', 'Student')  # Adjusted to match the correct app name
    Club = apps.get_model('clubs', 'Club')
    Member = apps.get_model('clubs', 'Member')

    # Delete members
    Member.objects.all().delete()

    # Delete students
    Student.objects.filter(studentid__in=["21449723", "21716304"]).delete()

    # Delete clubs
    Club.objects.filter(name__in=["Board Game Club", "Curtin Singapore Community Service Club"]).delete()

    # Delete users
    User.objects.filter(username__in=["21449723", "21716304"]).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('clubs', '0001_initial'),  # Replace with the last migration file in the clubs app
        ('user_profile', '0001_initial'),  # Replace with the last migration file in the user_profile app
    ]

    operations = [
        migrations.RunPython(create_users_and_students, reverse_users_and_students),
    ]