from rest_framework import serializers
from .models import Club, ClubMembership, ColorPalette
from colorthief import ColorThief
from django.core.cache import cache
import os
import colorsys
import json


class ClubListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for listing clubs.
    """
    class Meta:
        model = Club
        fields = ['id', 'name', 'description', 'logo', 'banner']


class ClubMembershipSerializer(serializers.ModelSerializer):
    student = serializers.SerializerMethodField()  # Use lazy import for StudentSerializer

    class Meta:
        model = ClubMembership
        fields = ['id', 'student', 'position', 'custom_position']

    def get_student(self, obj):
        from user_profile.serializers import StudentSerializer  # Lazy import
        return StudentSerializer(obj.student, context=self.context).data


class ClubSerializer(serializers.ModelSerializer):
    president = serializers.SerializerMethodField()  # Use lazy import for StudentSerializer
    members = ClubMembershipSerializer(source='clubmembership_set', many=True, read_only=True)
    dominant_color = serializers.SerializerMethodField()
    secondary_color = serializers.SerializerMethodField()
    tertiary_color = serializers.SerializerMethodField()
    shadow_color = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = ['id', 'name', 'description', 'president', 'logo', 'banner', 'members', 'dominant_color', 'shadow_color', 'secondary_color', 'tertiary_color'] 

    def get_president(self, obj):
        """
        Use StudentSerializer to fetch the president's profile data.
        """
        if obj.president:
            from user_profile.serializers import StudentSerializer  # Lazy import
            request = self.context.get('request')  # Pass the request context for absolute URLs
            return StudentSerializer(obj.president, context={'request': request}).data
        return None

    def get_dominant_color(self, obj):
        if not obj.banner:
            return None
            
        # Try to get from cache first (for fastest access)
        cache_key = f"club_{obj.id}_dominant_color"
        dominant_color = cache.get(cache_key)
        
        if dominant_color:
            return dominant_color
            
        # If not in cache, try to get from database
        try:
            # Just use the string representation of the banner URL as the key
            banner_key = str(obj.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            
            if palette.dominant_color:
                dominant_color = json.loads(palette.dominant_color)
                # Store in cache for faster subsequent access
                cache.set(cache_key, dominant_color, timeout=3600)
                return dominant_color
                    
            # If we don't have it in the database yet, calculate it
            try:
                import tempfile
                import urllib.request
                
                # Get the URL to the image (works with S3 or local)
                img_url = obj.banner.url
                
                # Download to a temp file
                with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                    urllib.request.urlretrieve(img_url, temp_file.name)
                    
                    # Process image with ColorThief
                    color_thief = ColorThief(temp_file.name)
                    color_palette = color_thief.get_palette(color_count=3, quality=1)
                    dominant_color = color_palette[0]
                    
                    # Save to cache
                    cache.set(cache_key, dominant_color, timeout=3600)
                    
                    # Save to database
                    palette.dominant_color = json.dumps(dominant_color)
                    palette.save()
                    
                    # Clean up temp file
                    import os
                    os.unlink(temp_file.name)
                    
                    return dominant_color
                    
            except Exception as e:
                print(f"Error calculating dominant color: {e}")
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None

    def get_secondary_color(self, obj):
        if not obj.banner:
            return None
            
        cache_key = f"club_{obj.id}_secondary_color"
        secondary = cache.get(cache_key)
        
        if secondary:
            return secondary
        
        try:
            # Just use the string representation of the banner URL as the key
            banner_key = str(obj.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            
            if palette.secondary_color:
                secondary = json.loads(palette.secondary_color)
                cache.set(cache_key, secondary, timeout=3600)
                return secondary
                    
            # If not in database, calculate it
            try:
                import tempfile
                import urllib.request
                
                # Get the URL to the image (works with S3 or local)
                img_url = obj.banner.url
                
                # Download to a temp file
                with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                    urllib.request.urlretrieve(img_url, temp_file.name)
                    
                    # Process image with ColorThief
                    color_thief = ColorThief(temp_file.name)
                    color_palette = color_thief.get_palette(color_count=3, quality=1)
                    
                    if len(color_palette) > 1:
                        secondary = color_palette[1]
                        
                        # Save to cache
                        cache.set(cache_key, secondary, timeout=3600)
                        
                        # Save to database
                        palette.secondary_color = json.dumps(secondary)
                        palette.save()
                        
                        # Clean up temp file
                        import os
                        os.unlink(temp_file.name)
                        
                        return secondary
                        
            except Exception as e:
                print(f"Error calculating secondary color: {e}")
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None

    def get_tertiary_color(self, obj):
        if not obj.banner:
            return None
            
        cache_key = f"club_{obj.id}_tertiary_color"
        tertiary = cache.get(cache_key)
        
        if tertiary:
            return tertiary
        
        try:
            # Just use the string representation of the banner URL as the key
            banner_key = str(obj.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            
            if palette.tertiary_color:
                tertiary = json.loads(palette.tertiary_color)
                cache.set(cache_key, tertiary, timeout=3600)
                return tertiary
                    
            # If not in database, calculate it
            try:
                import tempfile
                import urllib.request
                
                # Get the URL to the image (works with S3 or local)
                img_url = obj.banner.url
                
                # Download to a temp file
                with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                    urllib.request.urlretrieve(img_url, temp_file.name)
                    
                    # Process image with ColorThief
                    color_thief = ColorThief(temp_file.name)
                    color_palette = color_thief.get_palette(color_count=3, quality=1)
                    
                    if len(color_palette) > 2:
                        tertiary = color_palette[2]
                        
                        # Save to cache
                        cache.set(cache_key, tertiary, timeout=3600)
                        
                        # Save to database
                        palette.tertiary_color = json.dumps(tertiary)
                        palette.save()
                        
                        # Clean up temp file
                        import os
                        os.unlink(temp_file.name)
                        
                        return tertiary
                        
            except Exception as e:
                print(f"Error calculating tertiary color: {e}")
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None

    def get_shadow_color(self, obj):
        if not obj.banner:
            return None
            
        cache_key = f"club_{obj.id}_shadow_color"
        shadow_color = cache.get(cache_key)
        
        if shadow_color:
            return shadow_color
            
        try:
            # Just use the string representation of the banner URL as the key
            banner_key = str(obj.banner)
            palette, created = ColorPalette.objects.get_or_create(image_path=banner_key)
            
            if palette.shadow_color:
                shadow_color = json.loads(palette.shadow_color)
                cache.set(cache_key, shadow_color, timeout=3600)
                return shadow_color
                
            # If not in database, calculate it
            dominant_color = self.get_dominant_color(obj)
            if dominant_color:
                try:
                    r, g, b = [x / 255.0 for x in dominant_color]
                    h, l, s = colorsys.rgb_to_hls(r, g, b)
                    l = max(0, l * 0.3)
                    s = max(0, s * 0.5)
                    r, g, b = colorsys.hls_to_rgb(h, l, s)
                    shadow_color = [int(r * 255), int(g * 255), int(b * 255)]
                    
                    # Save to cache
                    cache.set(cache_key, shadow_color, timeout=3600)
                    
                    # Save to database
                    palette.shadow_color = json.dumps(shadow_color)
                    palette.save()
                    
                    return shadow_color
                except Exception as e:
                    print(f"Error calculating shadow color: {e}")
        except Exception as e:
            print(f"Error accessing color palette: {e}")
        
        return None