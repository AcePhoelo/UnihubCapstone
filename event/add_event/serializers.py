from rest_framework import serializers
from .models import Event
from clubs.models import Club  # Assuming the Club model is in the clubs app
from clubs.serializers import StudentSerializer
from user_profile.models import Student

class ClubSerializer(serializers.ModelSerializer):
    president = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = ['name', 'logo', 'president']

    def get_president(self, obj):
        """
        Returns the club president using the StudentSerializer.
        """
        if hasattr(obj, 'president') and obj.president:
            return StudentSerializer(obj.president).data
        return None

class EventSerializer(serializers.ModelSerializer):
    club = serializers.PrimaryKeyRelatedField(queryset=Club.objects.all(), write_only=True)
    club_details = ClubSerializer(source='club', read_only=True)
    created_by_details = serializers.SerializerMethodField()  # Add this line

    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['created_by']
        
    def get_created_by_details(self, obj):
        """Return details about the creator of the event"""
        if hasattr(obj, 'created_by') and obj.created_by:
            try:
                student = Student.objects.get(user=obj.created_by)
                return {
                    'studentid': student.studentid,
                    'full_name': student.full_name if hasattr(student, 'full_name') else obj.created_by.get_full_name(),
                    'email': obj.created_by.email
                }
            except:
                return None
        return None