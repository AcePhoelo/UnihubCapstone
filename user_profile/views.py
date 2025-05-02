from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Student
from rest_framework.response import Response
from .serializers import StudentSerializer
from rest_framework.decorators import api_view
@login_required
def student_list(request):
    students = Student.objects.all()
    student_data = []
    for student in students:
        student_data.append({
            "name": student.full_name,
            "email": student.email,
            "studentid": student.studentid,
            "badges": student.badges,
            "clubsjoined": list(student.clubsjoined.values_list('name', flat=True)),  # List of club names
            "leadership_clubs": list(student.leadership_clubs.values_list('name', flat=True)),  # List of leadership club names
        })
    return JsonResponse(student_data, safe=False)

@login_required
def student_detail(request, studentid):
    try:
        student = Student.objects.get(studentid=studentid)
        return JsonResponse({
            "name": student.full_name,
            "email": student.email,
            "studentid": student.studentid,
            "badges": student.badges,
            "clubsjoined": list(student.clubsjoined.values_list('name', flat=True)),  # List of club names
            "leadership_clubs": list(student.leadership_clubs.values_list('name', flat=True)),  # List of leadership club names
            "profile_picture": student.profile_picture.url if student.profile_picture else None,  # Include profile picture URL
        })
    except Student.DoesNotExist:
        return JsonResponse({'error': 'Student not found'}, status=404)
    
@api_view(['GET'])
def get_user_profile(request):
    user = request.user
    if user.is_authenticated:
        try:
            student = Student.objects.get(user=user)
            serializer = StudentSerializer(student, context={'request': request})
            return Response(serializer.data, status=200)
        except Student.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=404)
    return Response({"error": "User not authenticated"}, status=401)