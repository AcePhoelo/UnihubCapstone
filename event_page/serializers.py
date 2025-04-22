from rest_framework import serializers
from .models import ClubEventPage

class ClubEventPageSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='event.name')
    description = serializers.CharField(source='event.description')
    banner_image = serializers.ImageField(source='event.banner')
    #club_logo = serializers.ImageField()  # assuming this is directly on ClubEventPage

    class Meta:
        model = ClubEventPage
        fields = ['id', 'title', 'description', 'banner_image'] #, 'club_logo' <-- add this to add logo

    #def get_club_logo(self, obj):
    #   return '/media/club_logos/dlogo.png'

