from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .models import Club, Member
from user_profile.models import Student
from .serializers import ClubSerializer, MemberSerializer, ClubListSerializer

class MemberPagination(PageNumberPagination):
    page_size = 10

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_club_members(request, club_id):
    try:
        club = Club.objects.get(id=club_id)
        members = club.members.all()
        paginator = MemberPagination()
        result_page = paginator.paginate_queryset(members, request)
        serializer = MemberSerializer(result_page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def get_clubs_list(request):
    clubs = Club.objects.all()  # Fetch all clubs
    serializer = ClubListSerializer(clubs, many=True)  # Use the simplified serializer
    return Response(serializer.data)  # Return the serialized data


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_clubs(request):
    """
    Retrieve a list of all clubs.
    """
    clubs = Club.objects.all()
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
        data = request.data

        # Validate student
        student_id = data.get('student_id')
        if not student_id:
            return Response({"error": "Student ID is required"}, status=400)

        try:
            student = Student.objects.get(studentid=student_id)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=404)

        # Validate position
        position = data.get('position', 'Member')
        if position not in dict(Member.POSITION_CHOICES):
            return Response({"error": "Invalid position"}, status=400)

        # Add member to the club
        member, created = Member.objects.get_or_create(student=student)
        member.clubs.add(club)
        member.position = position
        member.custom_position = data.get('custom_position', '')
        member.save()

        return Response({"message": "Member added to club"}, status=201)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_member_in_club(request, club_id, student_id):
    """
    Update a member's details in a specific club.
    """
    try:
        club = Club.objects.get(id=club_id)
        student = Student.objects.get(studentid=student_id)
        member = Member.objects.get(student=student)

        if club not in member.clubs.all():
            return Response({"error": "Member is not part of this club"}, status=400)

        data = request.data

        # Update position or custom position
        if 'custom_position' in data:
            member.custom_position = data['custom_position']
            member.position = ''  # Clear predefined position if custom one is used
        elif 'position' in data:
            if data['position'] not in dict(Member.POSITION_CHOICES):
                return Response({"error": "Invalid position"}, status=400)
            member.position = data['position']
            member.custom_position = ''  # Clear custom position if predefined one is used

        member.save()
        return Response({"message": "Member updated"}, status=200)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)
    except Member.DoesNotExist:
        return Response({"error": "Member not found"}, status=404)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_member_from_club(request, club_id, student_id):
    """
    Remove a member from a specific club.
    """
    try:
        club = Club.objects.get(id=club_id)
        student = Student.objects.get(studentid=student_id)
        member = Member.objects.get(student=student)

        if club not in member.clubs.all():
            return Response({"error": "Member is not part of this club"}, status=400)

        member.clubs.remove(club)

        # If the member is no longer part of any club, delete the member record
        if member.clubs.count() == 0:
            member.delete()

        return Response({"message": "Member removed from club"}, status=200)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)
    except Member.DoesNotExist:
        return Response({"error": "Member not found"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_club(request):
    """
    Create a new club.
    """
    data = request.data

    # Validate required fields
    if not data.get('name'):
        return Response({"error": "Club name is required"}, status=400)

    # Create the club
    club = Club.objects.create(
        name=data['name'],
        description=data.get('description', ''),
        logo=data.get('logo', None)
    )

    return Response({"message": "Club created", "club": ClubSerializer(club).data}, status=201)

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
            club.name = data['name']
        if 'description' in data:
            club.description = data['description']
        if 'logo' in data:
            club.logo = data['logo']

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