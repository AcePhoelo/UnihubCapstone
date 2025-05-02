# views.py

from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate
import json
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework_simplejwt.views import TokenObtainPairView

# No custom token view is needed now; use the default TokenObtainPairView in your URLs.
# If you still need a login view for non-token-related authentication, you can update it to use "username".
@ensure_csrf_cookie
def set_csrf_cookie(request):
    return JsonResponse({"message": "CSRF cookie set"})

@ensure_csrf_cookie
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            # Use "username" because the default authentication expects that field.
            username = data.get("username")
            password = data.get("password")
            
            if not username or not password:
                return JsonResponse(
                    {"success": False, "message": "Username and password are required."},
                    status=400
                )

            # Authenticate the user
            user = authenticate(username=username, password=password)
            if user is not None:
                return JsonResponse({
                    "success": True,
                    "message": "Login successful",
                    "user": {"username": user.username}
                })
            else:
                return JsonResponse(
                    {"success": False, "message": "Invalid username or password"},
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
