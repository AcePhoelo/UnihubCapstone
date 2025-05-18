from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from .models import Club, ClubMembership 
from .forms import UpdatePositionForm
from user_profile.models import Student
from .serializers import ClubSerializer, ClubMembershipSerializer, ClubListSerializer
from user_profile.serializers import StudentSerializer
from api.utils import clean_input

class MemberPagination(PageNumberPagination):
    page_size = 10

@api_view(['GET'])
@permission_classes([AllowAny])
def get_club_members(request, club_id):
    """
    Retrieve all members of a specific club.
    """
    try:
        club = Club.objects.get(id=club_id)
        memberships = ClubMembership.objects.filter(club=club)
        paginator = MemberPagination()
        result_page = paginator.paginate_queryset(memberships, request)
        serializer = ClubMembershipSerializer(result_page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_clubs_list(request):
    clubs = Club.objects.all()  # Fetch all clubs
    serializer = ClubListSerializer(clubs, many=True)  # Use the simplified serializer
    return Response(serializer.data)  # Return the serialized data


@api_view(['GET'])
@permission_classes([AllowAny])
def get_clubs(request):
    """
    Retrieve a list of all clubs.
    """
    clubs = Club.objects.all()
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_club_details(request, club_id):
    """
    Fetch details of a specific club, including its members.
    """
    try:
        club = Club.objects.get(id=club_id)
        serializer = ClubSerializer(club, context={'request': request})
        return Response(serializer.data, status=200)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_member_to_club(request, club_id):
    """
    Add a member to a specific club.
    """
    try:
        club = Club.objects.get(id=club_id)
        student_id = request.data.get('student_id')
        position = clean_input(request.data.get('position', 'Member'))

        if not student_id:
            return Response({"error": "Student ID is required"}, status=400)

        student = Student.objects.get(studentid=student_id)

        # Create or update the ClubMembership record
        membership, created = ClubMembership.objects.get_or_create(club=club, student=student)
        membership.position = position
        membership.custom_position = clean_input(request.data.get('custom_position', ''))
        membership.save()

        return Response({"message": "Member added successfully"}, status=201)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_member_in_club(request, club_id, student_id):
    """
    Update a member's role or custom position in a specific club.
    """
    try:
        # Fetch the club, student, and membership
        club = Club.objects.get(id=club_id)
        student = Student.objects.get(studentid=student_id)
        membership = ClubMembership.objects.get(club=club, student=student)

        # Use UpdatePositionForm for validation
        form_data = {k: clean_input(v) if isinstance(v, str) else v for k, v in request.data.items()}
        form = UpdatePositionForm(data=form_data, instance=membership)
        if form.is_valid():
            form.save()  # Save the updated membership
            return Response({
                "message": "Member updated successfully",
                "membership": {
                    "id": membership.id,
                    "student": {
                        "id": membership.student.id,
                        "full_name": membership.student.full_name,
                        "studentid": membership.student.studentid,
                    },
                    "position": membership.position,
                    "custom_position": membership.custom_position,
                }
            }, status=200)
        else:
            return Response({"errors": form.errors}, status=400)

    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)
    except ClubMembership.DoesNotExist:
        return Response({"error": "Membership not found"}, status=404)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_member_from_club(request, club_id, student_id):
    """
    Remove a member from a specific club.
    """
    try:
        club = Club.objects.get(id=club_id)
        student = Student.objects.get(studentid=student_id)

        # Find the ClubMembership record
        try:
            membership = ClubMembership.objects.get(club=club, student=student)
            membership.delete()  # Remove the membership record

            # Return updated club data
            club_serializer = ClubSerializer(club, context={'request': request})
            return Response({
                "message": "Member removed from club",
                "is_member": False,
                "club": club_serializer.data
            }, status=200)

        except ClubMembership.DoesNotExist:
            return Response({"error": "Membership not found", "is_member": False}, status=404)

    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_club(request):
    """
    Create a new club with members.
    """
    data = request.POST
    logo = request.FILES.get('logo')  # Get the uploaded logo file
    banner = request.FILES.get('banner')  # Get the uploaded banner file

    print("Received data:", data)
    print("Received members:", [value for key, value in request.POST.items() if key.startswith('members[')])

    # Extract members from request.POST
    members = [value for key, value in request.POST.items() if key.startswith('members[')]

    # Validate required fields
    if not data.get('name'):
        return Response({"error": "Club name is required"}, status=400)
    if not data.get('description'):
        return Response({"error": "Club description is required"}, status=400)
    if not members or len(members) < 10:
        return Response({"error": "At least 10 members are required"}, status=400)

    # Validate student IDs
    students = Student.objects.filter(studentid__in=members)
    if students.count() != len(members):
        invalid_ids = set(members) - set(students.values_list('studentid', flat=True))
        return Response({"error": f"Invalid student IDs: {', '.join(invalid_ids)}"}, status=400)

    # Create the club
    club = Club.objects.create(
        name=clean_input(data['name']),
        description=clean_input(data['description']),
        logo=logo,  # Save the uploaded logo file
        banner=banner,  # Save the uploaded banner file
        president=request.user.student  # Assuming the logged-in user is the president
    )

    # Add the president as a member with "President" position
    ClubMembership.objects.create(
        student=request.user.student,
        club=club,
        position="President"
    )

    # Add members to the club using ClubMembership
    for student in students:
        ClubMembership.objects.create(
            student=student,
            club=club,
            position="Member"  # Default position
        )

    return Response({"message": "Club created successfully", "club": ClubSerializer(club).data}, status=201)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_club(request, club_id):
    """
    Update a club's details.
    """
    try:
        club = Club.objects.get(id=club_id)
        data = request.data

        # Update fields
        if 'name' in data:
            club.name = clean_input(data['name'])
        if 'description' in data:
            club.description = clean_input(data['description'])
        if 'logo' in data:
            club.logo = data['logo']
        if 'banner' in data:
            club.banner = data['banner']

        club.save()
        return Response({"message": "Club updated", "club": ClubSerializer(club).data}, status=200)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_club(request, club_id):
    """
    Delete a club.
    """
    try:
        club = Club.objects.get(id=club_id)
        club.delete()
        return Response({"message": "Club deleted"}, status=200)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_club_role(request, club_id, role_id):
    """Update an existing role in the club."""
    try:
        club = Club.objects.get(id=club_id)
        updated_name = clean_input(request.data.get('name'))
        role_type = clean_input(request.data.get('type', ''))
        
        if not updated_name:
            return Response({"error": "Role name is required"}, status=400)
        
        # Determine if standard role by checking against POSITION_CHOICES
        standard_positions = [choice[0] for choice in ClubMembership.POSITION_CHOICES]
        is_standard_role = updated_name in standard_positions or role_type == 'standard'
        
        # Handle custom role (format: 'custom_123')
        if str(role_id).startswith('custom_'):
            membership_id = int(str(role_id).replace('custom_', ''))
            try:
                # Get the specific membership and its custom position
                membership = ClubMembership.objects.get(id=membership_id, club=club)
                old_custom_position = membership.custom_position
                
                # Update based on role type
                if is_standard_role:
                    membership.position = updated_name
                    membership.custom_position = ''
                else:
                    membership.custom_position = updated_name
                
                membership.save()
                
                # Update any other members with the same custom role
                if old_custom_position:
                    ClubMembership.objects.filter(
                        club=club, 
                        custom_position=old_custom_position
                    ).update(custom_position=updated_name)
                    
                return Response({
                    "message": "Role updated successfully",
                    "name": updated_name
                }, status=200)
                
            except ClubMembership.DoesNotExist:
                return Response({"error": "Custom role not found"}, status=404)
        
        # Handle standard role
        else:
            # For standard roles, the role_id is the role name itself
            standard_role_name = role_id
            
            # President role cannot be renamed
            if standard_role_name == 'President' and updated_name != 'President':
                return Response({"error": "Cannot rename the President role"}, status=400)
                
            # Find all members with this standard role
            memberships = ClubMembership.objects.filter(club=club, position=standard_role_name)
            
            if not memberships.exists():
                return Response({"error": f"No members with role '{standard_role_name}'"}, status=404)
            
            # Update all matching members
            for membership in memberships:
                if is_standard_role:
                    membership.position = updated_name
                    membership.custom_position = ''
                else:
                    # Converting standard to custom
                    membership.position = 'Member'
                    membership.custom_position = updated_name
                membership.save()
            
            return Response({
                "message": "Role updated successfully",
                "name": updated_name
            }, status=200)
            
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_club_roles(request, club_id):
    """Retrieve all roles for a specific club."""
    try:
        club = Club.objects.get(id=club_id)
        # Get all unique positions in the club
        memberships = ClubMembership.objects.filter(club=club)
        roles = []
        
        for position in ClubMembership.POSITION_CHOICES:
            position_name = position[0]
            members_with_position = memberships.filter(position=position_name)
            if members_with_position.exists():
                roles.append({
                    'id': position_name,  # Use position name as ID
                    'name': position_name,
                    'members': [
                        {
                            'id': member.student.id,
                            'name': member.student.full_name,
                            'studentid': member.student.studentid
                        }
                        for member in members_with_position
                    ]
                })
        
        # Add custom positions
        custom_positions = memberships.exclude(custom_position__isnull=True).exclude(custom_position='')
        for membership in custom_positions:
            roles.append({
                'id': f"custom_{membership.id}",
                'name': membership.custom_position,
                'members': [{
                    'id': membership.student.id,
                    'name': membership.student.full_name,
                    'studentid': membership.student.studentid
                }]
            })
            
        return Response({"roles": roles}, status=200)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_club_role(request, club_id):
    """Add a new role to the club."""
    try:
        club = Club.objects.get(id=club_id)
        role_name = clean_input(request.data.get('role'))
        role_type = clean_input(request.data.get('type'))
        members = request.data.get('members', [])

        if not role_name or not role_type:
            return Response({'error': 'Role name and type are required'}, status=400)
        if not members:
            return Response({'error': 'At least one member is required'}, status=400)

        # Create or update memberships
        for member_id in members:
            try:
                student = Student.objects.get(id=member_id)
                membership, created = ClubMembership.objects.get_or_create(
                    club=club, 
                    student=student
                )
                membership.position = role_name if role_type == 'standard' else 'Member'
                membership.custom_position = role_name if role_type == 'custom' else None
                membership.save()
            except Student.DoesNotExist:
                return Response({"error": f"Student with ID {member_id} not found"}, status=404)

        # Return success response
        return Response({
            "message": "Role added successfully",
            "role": {
                "id": role_name if role_type == 'standard' else f"custom_{role_name}",
                "name": role_name,
                "members": members
            }
        }, status=201)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_club_role(request, club_id, role_id=None):
    """Delete a role from the club."""
    try:
        club = Club.objects.get(id=club_id)

        # Handle standard roles
        if not role_id:
            role_name = clean_input(request.data.get('role'))
            if not role_name:
                return Response({"error": "Role name is required"}, status=400)

            if role_name == "President":
                return Response({"error": "Cannot delete the President role"}, status=400)

            # Reset members with this role to "Member"
            memberships = ClubMembership.objects.filter(club=club, position=role_name)
            for membership in memberships:
                membership.position = 'Member'
                membership.save()

            return Response({"message": "Role deleted successfully"}, status=200)

        # Handle custom roles - convert role_id to string before checking
        role_id_str = str(role_id)
        if role_id_str.startswith('custom_'):
            custom_id = int(role_id_str.replace('custom_', ''))
            try:
                # Find all memberships with this custom position
                memberships = ClubMembership.objects.filter(
                    club=club, 
                    custom_position=ClubMembership.objects.get(id=custom_id).custom_position
                )
                
                # Reset all matching members to regular members
                for membership in memberships:
                    membership.custom_position = ''
                    membership.position = 'Member'  # Ensure they become regular members
                    membership.save()
                    
            except ClubMembership.DoesNotExist:
                return Response({"error": "Custom role not found"}, status=404)
        else:
            try:
                # Get the role name first
                membership = ClubMembership.objects.get(id=role_id, club=club)
                role_name = membership.custom_position
                
                # Find all memberships with this custom position
                if role_name:
                    memberships = ClubMembership.objects.filter(
                        club=club, 
                        custom_position=role_name
                    )
                    
                    # Reset all matching members to regular members
                    for member in memberships:
                        member.custom_position = ''
                        member.position = 'Member'  # Ensure they become regular members
                        member.save()
                else:
                    # Just reset this single membership
                    membership.custom_position = ''
                    membership.position = 'Member'
                    membership.save()
                    
            except ClubMembership.DoesNotExist:
                return Response({"error": f"Role with ID {role_id} not found"}, status=404)

        return Response({"message": "Role deleted successfully"}, status=200)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_position_choices(request, club_id):
    """Return the POSITION_CHOICES from the ClubMembership model."""
    choices = [{"value": choice[0], "label": choice[1]} for choice in ClubMembership.POSITION_CHOICES]
    return Response(choices)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def transfer_leadership(request, club_id):
    """
    Transfer club leadership from current president to another member.
    """
    try:
        club = Club.objects.get(id=club_id)
        current_user = request.user.student
        new_president_id = clean_input(request.data.get('new_president_id'))
        
        # Verify the current user is the president
        if club.president != current_user:
            return Response({"error": "Only the current president can transfer leadership"}, status=403)
        
        # Verify the new president exists and is a member
        try:
            new_president = Student.objects.get(id=new_president_id)
            membership = ClubMembership.objects.get(club=club, student=new_president)
        except (Student.DoesNotExist, ClubMembership.DoesNotExist):
            return Response({"error": "Selected user is not a member of this club"}, status=400)
        
        # Update the club president
        club.president = new_president
        club.save()
        
        # Update the membership status of the new president
        # Clear any custom role when making someone President
        membership.position = 'President'
        membership.custom_position = ''  # Clear any custom role
        membership.save()
        
        # Remove the old president if requested or make them a regular member
        remove_old = request.data.get('remove_old_president', False)
        try:
            old_membership = ClubMembership.objects.get(club=club, student=current_user)
            if remove_old:
                old_membership.delete()
            else:
                # If staying, make them a regular member with no custom role
                old_membership.position = 'Member'
                old_membership.custom_position = ''
                old_membership.save()
        except ClubMembership.DoesNotExist:
            # Handle edge case where old president membership record doesn't exist
            pass
            
        return Response({
            "message": "Leadership transferred successfully",
            "new_president": {
                "id": new_president.id,
                "full_name": new_president.full_name,
                "studentid": new_president.studentid
            }
        }, status=200)
        
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)