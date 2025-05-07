from django.http import JsonResponse
from django.shortcuts import render
def api_overview(request):
    return JsonResponse({
        "Available Endpoints": {
            "Admin Panel": "/admin/",
            "Register User": "/api/user/register/",
            "Obtain Token": "/api/token/",
            "Refresh Token": "/api/token/refresh/",
            "Feedback List/Create": "/api/feedback/",
            "Login": "/api/login/",
        }
    })

def frontend(request):
    return render(request, "index.html")  # This will render "my-app/public/index.html"