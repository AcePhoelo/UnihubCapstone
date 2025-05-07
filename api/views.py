# views.py

from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate
import json
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from user_profile.models import Student
#security addition
from django.views.decorators.csrf import csrf_protect
from ratelimit.decorators import ratelimit

# No custom token view is needed now; use the default TokenObtainPairView in your URLs.
# If you still need a login view for non-token-related authentication, you can update it to use "username".
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_user(request):
    user = request.user
    try:
        student = Student.objects.get(user=user)
        return Response({
            'username': user.username,
            'email': user.email,
            'student_id': student.studentid,
            'profile': {
                'full_name': student.full_name if hasattr(student, 'full_name') else f"{user.first_name} {user.last_name}",
                'profile_picture': student.profile_picture.url if student.profile_picture else None,
            }
        })
    except Student.DoesNotExist:
        return Response({'error': 'Student profile not found'}, status=404)


@ensure_csrf_cookie
def set_csrf_cookie(request):
    return JsonResponse({"message": "CSRF cookie set"})

@ensure_csrf_cookie
@csrf_protect
@ratelimit(key='ip', rate='5/m', block=True)
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            # Use "student_id" instead of "username"
            student_id = data.get("student_id")
            password = data.get("password")
            
            # Validate input
            if not student_id or not password:
                return JsonResponse({"success": False, "message": "Student ID and password are required."}, status=400)
            
            # Ensure student_id is exactly 8 digits
            if not student_id.isdigit() or len(student_id) != 8:
                return JsonResponse({"success": False, "message": "Invalid Student ID format. It must be 8 digits."}, status=400)

            # Authenticate the user using the student ID
            try:
                user = Student.objects.get(studentid=student_id).user
            except Student.DoesNotExist:
                return JsonResponse({"success": False, "message": "Invalid Student ID or password."}, status=401)

            # Check the password
            user = authenticate(username=user.username, password=password)
            if user is not None:
                return JsonResponse({
                    "success": True,
                    "message": "Login successful",
                    "user": {"username": user.username}
                })
            else:
                return JsonResponse(
                    {"success": False, "message": "Invalid Student ID or password."},
                    status=401
                )
        except json.JSONDecodeError:
            return JsonResponse(
                {"success": False, "message": "Invalid JSON data"},
                status=400
            )
    elif request.method == "GET":
        return JsonResponse(
            {"success": False, "message": "This endpoint only supports POST requests."},
            status=405
        )

    return JsonResponse(
        {"success": False, "message": "Invalid request method"},
        status=405
    )