from rest_framework import serializers
from .models import Event
from clubs.models import Club, ColorPalette
from clubs.signals import calculate_colors  # Assuming the Club model is in the clubs app
from user_profile.serializers import StudentSerializer
from user_profile.models import Student
from colorthief import ColorThief
from django.core.cache import cache
import os
import colorsys
import json

class ClubSerializer(serializers.ModelSerializer):
    president = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = ['id', 'name', 'logo', 'president']

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
    dominant_color = serializers.SerializerMethodField()
    secondary_color = serializers.SerializerMethodField()
    tertiary_color = serializers.SerializerMethodField()
    shadow_color = serializers.SerializerMethodField()

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
    
        
    def get_dominant_color(self, obj):
        if not obj.event.banner:  # Note: Using event.banner instead of banner directly
            return None
            
        # Try to get from cache first (for fastest access)
        cache_key = f"event_{obj.id}_dominant_color"
        dominant_color = cache.get(cache_key)
        
        if dominant_color:
            return dominant_color
            
        # If not in cache, try to get from database
        try:
            # Use the string representation of the banner as the key
            banner_key = str(obj.event.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            if palette.dominant_color:
                dominant_color = json.loads(palette.dominant_color)
                # Store in cache for faster subsequent access
                cache.set(cache_key, dominant_color, timeout=3600)
                return dominant_color
                    
            # If we don't have it in the database yet, calculate it
            color_palette = calculate_colors(obj.event.banner)
            if color_palette and color_palette.dominant_color:
                dominant_color = json.loads(color_palette.dominant_color)
                cache.set(cache_key, dominant_color, timeout=3600)
                return dominant_color
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None

    def get_secondary_color(self, obj):
        if not obj.event.banner:
            return None
            
        cache_key = f"event_{obj.id}_secondary_color"
        secondary = cache.get(cache_key)
        
        if secondary:
            return secondary
        
        try:
            # Use string representation instead of path
            banner_key = str(obj.event.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            if palette.secondary_color:
                secondary = json.loads(palette.secondary_color)
                cache.set(cache_key, secondary, timeout=3600)
                return secondary
                    
            # If not in database, calculate all colors at once
            color_palette = calculate_colors(obj.event.banner)
            if color_palette and color_palette.secondary_color:
                secondary = json.loads(color_palette.secondary_color)
                cache.set(cache_key, secondary, timeout=3600)
                return secondary
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None

    def get_tertiary_color(self, obj):
        if not obj.event.banner:
            return None
            
        cache_key = f"event_{obj.id}_tertiary_color"
        tertiary = cache.get(cache_key)
        
        if tertiary:
            return tertiary
        
        try:
            # Use string representation instead of path
            banner_key = str(obj.event.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            if palette.tertiary_color:
                tertiary = json.loads(palette.tertiary_color)
                cache.set(cache_key, tertiary, timeout=3600)
                return tertiary
                    
            # If not in database, calculate all colors at once
            color_palette = calculate_colors(obj.event.banner)
            if color_palette and color_palette.tertiary_color:
                tertiary = json.loads(color_palette.tertiary_color)
                cache.set(cache_key, tertiary, timeout=3600)
                return tertiary
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None

    def get_shadow_color(self, obj):
        if not obj.event.banner:
            return None
            
        cache_key = f"event_{obj.id}_shadow_color"
        shadow_color = cache.get(cache_key)
        
        if shadow_color:
            return shadow_color
            
        try:
            # Use string representation instead of path
            banner_key = str(obj.event.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            if palette.shadow_color:
                shadow_color = json.loads(palette.shadow_color)
                cache.set(cache_key, shadow_color, timeout=3600)
                return shadow_color
                
            # If not in database, calculate all colors at once
            color_palette = calculate_colors(obj.event.banner)
            if color_palette and color_palette.shadow_color:
                shadow_color = json.loads(color_palette.shadow_color)
                cache.set(cache_key, shadow_color, timeout=3600)
                return shadow_color
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None
    
    def to_representation(self, instance):
        """Ensure club ID is always present in the response"""
        data = super().to_representation(instance)
        
        # Make sure club ID is included even if it's None
        if 'club' not in data or data['club'] is None:
            # If there's a club_details reference but no direct club ID
            if data.get('club_details') and data['club_details'].get('id'):
                data['club'] = data['club_details']['id']
        
        return data

        
