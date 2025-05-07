from django.test import TestCase
from rest_framework.test import APIClient

class FeedbackViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.username = "21449723"
        self.password = "Unihub+Capstone"
        self.user = self.create_user()

    def create_user(self):
        from django.contrib.auth.models import User
        user = User.objects.create_user(username=self.username, password=self.password)
        return user

    def test_feedback_view_access(self):
        # Step 1: Obtain a token
        response = self.client.post("/api/token/", data={
            "username": self.username,
            "password": self.password
        })
        self.assertEqual(response.status_code, 200)
        token_data = response.json()
        access_token = token_data["access"]

        # Step 2: Access the feedback view
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
        response = self.client.get("/feedback/")
        self.assertEqual(response.status_code, 200)
        print(response.json())