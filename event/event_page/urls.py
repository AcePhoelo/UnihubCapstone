from django.urls import path
from .views import ClubEventPageDetailView

urlpatterns = [
    path('event-page/<int:pk>/', ClubEventPageDetailView.as_view(), name='event-page-detail'),
]