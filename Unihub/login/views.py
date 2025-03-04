from django.shortcuts import render
from django.http import HttpResponse

# Create your views (access data required by requests to satisfy models.py) here.
def index(request):
    return HttpResponse("Login successful.")