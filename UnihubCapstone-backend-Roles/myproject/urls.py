from django.contrib import admin
from django.urls import path

from collaboration.views import index
from roles.views import update_position, member_list  # Import the member_list view

urlpatterns = [
    path('', index, name='index'),
    path('admin/', admin.site.urls),
    path('members/', member_list, name='member_list'),  # Add the member_list URL
    path('members/<int:member_id>/update/', update_position, name='update_position'),
]