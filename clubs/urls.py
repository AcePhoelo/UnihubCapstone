from django.urls import path
from .views import (
    get_club_details,
    get_club_members,
    add_member_to_club,
    update_member_in_club,
    remove_member_from_club,
    get_clubs_list,
    create_club,
    update_club,
    delete_club,
    get_clubs,
    get_club_roles,
    add_club_role,
    delete_club_role,
    get_position_choices,
)

urlpatterns = [
    # Club endpoints
    path('', get_clubs, name='get_clubs'),  # Endpoint to retrieve all clubs
    path('clubs/<int:club_id>/', get_club_details, name='get_club_details'),  # GET club details
    path('clubs/create/', create_club, name='create_club'),  # POST create a new club
    path('clubs/<int:club_id>/update/', update_club, name='update_club'),  # PUT update a club
    path('clubs/<int:club_id>/delete/', delete_club, name='delete_club'),  # DELETE a club
    path('list/', get_clubs_list, name='get_clubs_list'),  # GET all clubs for dropdown

    # Member endpoints
    path('clubs/<int:club_id>/members/', get_club_members, name='get_club_members'),  # GET all members of a club
    path('clubs/<int:club_id>/members/add/', add_member_to_club, name='add_member_to_club'),  # POST add a member
    path('clubs/<int:club_id>/members/<str:student_id>/update/', update_member_in_club, name='update_member_in_club'),  # PUT update a member
    path('clubs/<int:club_id>/members/<str:student_id>/remove/', remove_member_from_club, name='remove_member_from_club'),  # DELETE a member

    # Role endpoints
    path('clubs/<int:club_id>/roles/', get_club_roles, name='get_club_roles'),
    path('clubs/<int:club_id>/roles/add/', add_club_role, name='add_club_role'),
    path('clubs/<int:club_id>/roles/<int:role_id>/delete/', delete_club_role, name='delete_club_role'),
    path('clubs/<int:club_id>/roles/position_choices/', get_position_choices, name='get_position_choices'),  # GET position choices for a club
]