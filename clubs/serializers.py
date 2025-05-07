from rest_framework import serializers
from .models import Club, ClubMembership
from user_profile.models import Student
from user_profile.serializers import StudentSerializer
from colorthief import ColorThief
from django.core.cache import cache
import os
import colorsys


class ClubListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['id', 'name']  # Only include the fields needed for the dropdown

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'studentid', 'full_name', 'email', 'profile_picture']

# class MemberSerializer(serializers.ModelSerializer):
#     """
#     Serializer for the Member model.
#     Includes details about the student and their position in the club.
#     """
#     student = StudentSerializer()  # Nested serializer to include student details

#     class Meta:
#         model = Member
#         fields = ['id', 'student', 'position', 'custom_position']

class ClubMembershipSerializer(serializers.ModelSerializer):
    student = StudentSerializer()  # Include student details

    class Meta:
        model = ClubMembership
        fields = ['id', 'student', 'position', 'custom_position']


class ClubSerializer(serializers.ModelSerializer):
    president = StudentSerializer(read_only=True)
    members = ClubMembershipSerializer(source='clubmembership_set', many=True, read_only=True)
    dominant_color = serializers.SerializerMethodField()
    shadow_color = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = ['id', 'name', 'description', 'president', 'logo', 'banner', 'members', 'dominant_color', 'shadow_color']

    def get_dominant_color(self, obj):
        """
        Get the dominant color of the banner image, with caching.
        """
        cache_key = f"club_{obj.id}_dominant_color"
        dominant_color = cache.get(cache_key)
        if not dominant_color:
            if obj.banner and os.path.exists(obj.banner.path):
                try:
                    # Use ColorThief to calculate the dominant color
                    color_thief = ColorThief(obj.banner.path)
                    dominant_color = color_thief.get_color(quality=1)
                    cache.set(cache_key, dominant_color, timeout=3600)  # Cache for 1 hour
                except Exception as e:
                    print(f"Error calculating dominant color: {e}")
                    return None
        return dominant_color

    def get_shadow_color(self, obj):
        """
        Get the shadow color based on the dominant color, with caching.
        """
        cache_key = f"club_{obj.id}_shadow_color"
        shadow_color = cache.get(cache_key)
        if not shadow_color:
            dominant_color = self.get_dominant_color(obj)
            if dominant_color:
                try:
                    # Convert RGB to HLS (Hue, Lightness, Saturation)
                    r, g, b = [x / 255.0 for x in dominant_color]
                    h, l, s = colorsys.rgb_to_hls(r, g, b)

                    # Darken and desaturate the color more aggressively
                    l = max(0, l * 0.3)  # Reduce lightness more
                    s = max(0, s * 0.5)  # Optionally reduce saturation further

                    # Convert back to RGB
                    r, g, b = colorsys.hls_to_rgb(h, l, s)
                    shadow_color = [int(r * 255), int(g * 255), int(b * 255)]
                    cache.set(cache_key, shadow_color, timeout=2592000)  # Cache for 30 days
                except Exception as e:
                    print(f"Error calculating shadow color: {e}")
                    return None
        return shadow_color