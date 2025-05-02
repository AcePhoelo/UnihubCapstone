from django.contrib import admin
from .models import Club, Member

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'position', 'custom_position', 'get_clubs')  # Display student name and clubs
    list_filter = ('position', 'clubs')  # Add filters for position and clubs
    search_fields = ('student__full_name', 'student__studentid')  # Add search functionality for student name and ID

    def student_name(self, obj):
        return obj.student.full_name  # Display the student's full name
    student_name.short_description = 'Student Name'

    def get_clubs(self, obj):
        return ", ".join([club.name for club in obj.clubs.all()])  # Display a comma-separated list of clubs
    get_clubs.short_description = 'Clubs'


@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'president', 'logo')  # Display club details
    search_fields = ('name', 'description', 'president')  # Add search functionality for club fields
    list_filter = ('president',)  # Add a filter for the president field