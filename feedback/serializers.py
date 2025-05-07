from rest_framework import serializers
from .models import Feedback
from user_profile.models import Student
from user_profile.serializers import StudentSerializer

class FeedbackSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(read_only=True)
    student_details = StudentSerializer(source='student', read_only=True)
    
    class Meta:
        model = Feedback
        fields = ['id', 'event', 'student', 'student_details', 'role', 'like', 'dislike', 'satisfaction', 'experience']