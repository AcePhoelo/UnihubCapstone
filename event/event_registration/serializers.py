from rest_framework import serializers
from .models import EventRegistration
from user_profile.serializers import StudentSerializer

class EventRegistrationSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)  # Add this line to include nested student data
    
    class Meta:
        model = EventRegistration
        fields = '__all__'