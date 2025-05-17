import os
from django.conf import settings
from colorthief import ColorThief
import json

def calculate_colors_from_field(image_field):
    """Calculate color palette from an ImageField properly handling path conversion"""
    if not image_field:
        return None
        
    try:
        # Convert ImageFieldFile to proper path string
        if hasattr(image_field, 'path') and os.path.exists(image_field.path):
            image_path = image_field.path
        else:
            # Use the storage path
            image_path = os.path.join(settings.MEDIA_ROOT, str(image_field))
            
        # Make sure path exists
        if not os.path.exists(image_path):
            print(f"Image path does not exist: {image_path}")
            return None
            
        # Now use ColorThief with the proper path
        color_thief = ColorThief(image_path)
        palette = color_thief.get_palette(color_count=4, quality=10)
        
        # Store these as JSON strings
        return {
            'dominant_color': json.dumps(list(palette[0])),
            'secondary_color': json.dumps(list(palette[1])) if len(palette) > 1 else None,
            'tertiary_color': json.dumps(list(palette[2])) if len(palette) > 2 else None,
            'shadow_color': json.dumps(list(palette[0][:3] + [0.3]))  # Add alpha for shadow
        }
    except Exception as e:
        print(f"Error calculating colors: {e}")
        return None