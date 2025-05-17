from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Club, ColorPalette
from event.add_event.models import Event
from colorthief import ColorThief
import colorsys
import os
import json
from .utils import calculate_colors_from_field

def calculate_colors(image_field):
    """Wrapper around calculate_colors_from_field"""
    return calculate_colors_from_field(image_field)# filepath: d:\UnihubCapstone\backend\clubs\signals.py


@receiver(post_save, sender=Club)
def calculate_club_colors(sender, instance, created=False, **kwargs):
    """Calculate colors when a club is created or updated"""
    if instance.banner and instance.banner.name:
        try:
            # Use the physical file path if available, otherwise use the file object
            if hasattr(instance.banner, 'path'):
                calculate_colors(instance.banner.path)
            else:
                # Store file temporarily to process it
                from django.core.files.storage import default_storage
                from django.core.files.base import ContentFile
                import tempfile
                
                temp_file = tempfile.NamedTemporaryFile(delete=False)
                temp_file.write(instance.banner.read())
                temp_file.close()
                calculate_colors(temp_file.name)
                os.unlink(temp_file.name)  # Clean up temp file
        except Exception as e:
            print(f"Error processing club banner: {e}")
        
@receiver(post_save, sender=Event)
def calculate_event_colors(sender, instance, created=False, **kwargs):
    """Calculate colors when an event is created or updated"""
    if instance.banner and instance.banner.name:
        try:
            print(f"Processing colors for event: {instance.name}, ID: {instance.id}")
            
            # Use the banner's string representation as the key
            banner_key = str(instance.banner)
            
            # Try to get the palette first 
            palette = None
            try:
                palette = ColorPalette.objects.get(image_path=banner_key)
                print(f"Found existing palette for {banner_key}")
            except ColorPalette.DoesNotExist:
                print(f"No palette exists for {banner_key}, will create")
            
            # Use the physical file path if available
            if hasattr(instance.banner, 'path'):
                palette = calculate_colors(instance.banner)
                print(f"Calculated colors from path: {palette}")
            else:
                # Store file temporarily to process it
                from django.core.files.storage import default_storage
                import tempfile
                
                temp_file = tempfile.NamedTemporaryFile(delete=False)
                instance.banner.file.seek(0)  # Reset file pointer
                temp_file.write(instance.banner.file.read())
                temp_file.close()
                
                palette = calculate_colors(instance.banner)
                print(f"Calculated colors from temp file: {palette}")
                
                os.unlink(temp_file.name)  # Clean up temp file
                
            if palette:
                print(f"Colors saved: dominant={palette.dominant_color}, secondary={palette.secondary_color}")
            else:
                print("No palette was returned from calculate_colors")
                
        except Exception as e:
            print(f"Error processing event banner: {e}")
            import traceback
            traceback.print_exc()