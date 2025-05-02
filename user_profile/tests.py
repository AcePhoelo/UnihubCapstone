from django.test import TestCase
from django.contrib.auth.models import User
from user_profile.models import Student
from clubs.models import Club

class StudentModelTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create users
        cls.hans_user, _ = User.objects.update_or_create(
            username="21449723",  # Student ID
            defaults={
                "password": "Unihub+Capstone",
                "first_name": "Hans",
                "last_name": "Hartowidjojo",
                "email": "21449723@student.curtin.edu.au"
            }
        )

        cls.evangeline_user, _ = User.objects.update_or_create(
            username="21716304",  # Student ID
            defaults={
                "password": "Evangeline+Tanoto",
                "first_name": "Evangeline",
                "last_name": "Tanoto",
                "email": "21716304@student.curtin.edu.au"
            }
        )

        # Create clubs
        cls.board_game_club, _ = Club.objects.update_or_create(
            name="Board Game Club",
            defaults={
                "description": "A club where everyone can come and join to play board games and destress",
                "president": "Hans Hartowidjojo"
            }
        )

        cls.community_service_club, _ = Club.objects.update_or_create(
            name="Curtin Singapore Community Service Club",
            defaults={
                "description": "A club where students can volunteer to help out the Singapore community",
                "president": "Evangeline Tanoto"
            }
        )

        # Create or update student profiles
        cls.hans_student, _ = Student.objects.update_or_create(
            user=cls.hans_user,
            defaults={
                "full_name": "Hans Hartowidjojo",
                "email": "21449723@student.curtin.edu.au",
                "studentid": "21449723",
                "profile_picture": "profile_pictures/Greatness_229.JPG"  # Assign profile picture for Hans
            }
        )
        cls.hans_student.clubsjoined.set([cls.board_game_club, cls.community_service_club])
        cls.hans_student.leadership_clubs.set([cls.board_game_club])

        cls.evangeline_student, _ = Student.objects.update_or_create(
            user=cls.evangeline_user,
            defaults={
                "full_name": "Evangeline Tanoto",
                "email": "21716304@student.curtin.edu.au",
                "studentid": "21716304",
                "profile_picture": "profile_pictures/leader2.jpeg"  # Assign profile picture for Evangeline
            }
        )
        cls.evangeline_student.clubsjoined.set([cls.community_service_club])
        cls.evangeline_student.leadership_clubs.set([cls.community_service_club])

    def test_hans_profile(self):
        # Test Hans's profile
        hans = Student.objects.get(studentid="21449723")
        self.assertEqual(hans.full_name, "Hans Hartowidjojo")
        self.assertEqual(hans.email, "21449723@student.curtin.edu.au")
        self.assertEqual(hans.profile_picture, "profile_pictures/Greatness_229.JPG")  # Verify profile picture
        self.assertIn(self.board_game_club, hans.clubsjoined.all())
        self.assertIn(self.community_service_club, hans.clubsjoined.all())
        self.assertIn(self.board_game_club, hans.leadership_clubs.all())

    def test_evangeline_profile(self):
        # Test Evangeline's profile
        evangeline = Student.objects.get(studentid="21716304")
        self.assertEqual(evangeline.full_name, "Evangeline Tanoto")
        self.assertEqual(evangeline.email, "21716304@student.curtin.edu.au")
        self.assertEqual(evangeline.profile_picture, "profile_pictures/leader2.jpeg")  # Verify profile picture
        self.assertIn(self.community_service_club, evangeline.clubsjoined.all())
        self.assertIn(self.community_service_club, evangeline.leadership_clubs.all())