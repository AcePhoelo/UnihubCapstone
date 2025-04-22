from django.contrib import admin
from .models import Member, Club  # Import the models

# Register the models
admin.site.register(Member)
admin.site.register(Club)