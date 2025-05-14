from rest_framework import serializers
from .models import ClubEventPage
from clubs.models import ColorPalette
from clubs.signals import calculate_colors  # Assuming the Club model is in the clubs app
import os
from colorthief import ColorThief  
from django.core.cache import cache
import colorsys 
import json

class ClubEventPageSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='event.name')
    description = serializers.CharField(source='event.description')
    banner_image = serializers.ImageField(source='event.banner')
    club_logo = serializers.ImageField(source='event.club.logo')  # assuming this is directly on ClubEventPage

    class Meta:
        model = ClubEventPage
        fields = ['id', 'title', 'description', 'banner_image', 'club_logo', 'dominant_color', 'secondary_color', 'tertiary_color', 'shadow_color'] #, 'club_logo' <-- add this to add logo


    def get_dominant_color(self, obj):
        if not obj.banner:
            return None
            
        # Try to get from cache first (for fastest access)
        cache_key = f"event_{obj.id}_dominant_color"
        dominant_color = cache.get(cache_key)
        
        if dominant_color:
            return dominant_color
            
        # If not in cache, try to get from database
        try:
            # Use the string representation of the banner as the key
            banner_key = str(obj.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            if palette.dominant_color:
                dominant_color = json.loads(palette.dominant_color)
                # Store in cache for faster subsequent access
                cache.set(cache_key, dominant_color, timeout=3600)
                return dominant_color
                    
            # If we don't have it in the database yet, calculate it
            color_palette = calculate_colors(obj.banner)
            if color_palette and color_palette.dominant_color:
                dominant_color = json.loads(color_palette.dominant_color)
                cache.set(cache_key, dominant_color, timeout=3600)
                return dominant_color
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None

    def get_secondary_color(self, obj):
        if not obj.banner:
            return None
            
        cache_key = f"event_{obj.id}_secondary_color"
        secondary = cache.get(cache_key)
        
        if secondary:
            return secondary
        
        try:
            # Use string representation instead of path
            banner_key = str(obj.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            if palette.secondary_color:
                secondary = json.loads(palette.secondary_color)
                cache.set(cache_key, secondary, timeout=3600)
                return secondary
                    
            # If not in database, calculate all colors at once
            color_palette = calculate_colors(obj.banner)
            if color_palette and color_palette.secondary_color:
                secondary = json.loads(color_palette.secondary_color)
                cache.set(cache_key, secondary, timeout=3600)
                return secondary
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None

    def get_tertiary_color(self, obj):
        if not obj.banner:
            return None
            
        cache_key = f"event_{obj.id}_tertiary_color"
        tertiary = cache.get(cache_key)
        
        if tertiary:
            return tertiary
        
        try:
            # Use string representation instead of path
            banner_key = str(obj.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            if palette.tertiary_color:
                tertiary = json.loads(palette.tertiary_color)
                cache.set(cache_key, tertiary, timeout=3600)
                return tertiary
                    
            # If not in database, calculate all colors at once
            color_palette = calculate_colors(obj.banner)
            if color_palette and color_palette.tertiary_color:
                tertiary = json.loads(color_palette.tertiary_color)
                cache.set(cache_key, tertiary, timeout=3600)
                return tertiary
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None

    def get_shadow_color(self, obj):
        if not obj.banner:
            return None
            
        cache_key = f"event_{obj.id}_shadow_color"
        shadow_color = cache.get(cache_key)
        
        if shadow_color:
            return shadow_color
            
        try:
            # Use string representation instead of path
            banner_key = str(obj.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            if palette.shadow_color:
                shadow_color = json.loads(palette.shadow_color)
                cache.set(cache_key, shadow_color, timeout=3600)
                return shadow_color
                
            # If not in database, calculate all colors at once
            color_palette = calculate_colors(obj.banner)
            if color_palette and color_palette.shadow_color:
                shadow_color = json.loads(color_palette.shadow_color)
                cache.set(cache_key, shadow_color, timeout=3600)
                return shadow_color
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None
