from django.contrib import admin
from .models import Club, ClubMembership

@admin.register(ClubMembership)
class ClubMembershipAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'club_name', 'position', 'custom_position')  # Display student name, club, and position
    list_filter = ('position', 'club')  # Add filters for position and club
    search_fields = ('student__full_name', 'student__studentid', 'club__name')  # Add search functionality for student and club fields

    def student_name(self, obj):
        return obj.student.full_name  # Display the student's full name
    student_name.short_description = 'Student Name'

    def club_name(self, obj):
        return obj.club.name  # Display the club's name
    club_name.short_description = 'Club'

@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'president', 'logo')  # Display club details
    search_fields = ('name', 'description', 'president__full_name')  # Add search functionality for club fields
    list_filter = ('president',)  # Add a filter for the president field