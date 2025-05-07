from rest_framework import serializers
from .models import Student
from clubs.models import Club

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['id', 'name', 'description', 'president', 'logo']

class StudentSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()  # Add this to return the full URL
    clubsjoined = ClubSerializer(many=True, read_only=True)
    leadership_clubs = ClubSerializer(many=True, read_only=True)
    
    def get_profile_picture(self, obj):
        request = self.context.get('request')
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url) if request else obj.profile_picture.url
        return None

    class Meta:
        model = Student
        fields = [
            'id',
            'full_name',
            'email',
            'studentid',
            'profile_picture',
            'badges',
            'clubsjoined',
            'leadership_clubs',
        ]
        depth = 1