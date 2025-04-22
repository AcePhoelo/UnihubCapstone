from django.urls import path
from .views import EventRegistrationCreateView, EventRegistrationListView, EventParticipantsListView

urlpatterns = [
    path('register/', EventRegistrationCreateView.as_view(), name='event-registration'),
    path('<int:event_id>/participants/', EventParticipantsListView.as_view(), name='event-participants'),
]
