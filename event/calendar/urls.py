from django.urls import path
from .views import CalendarEventListView

urlpatterns = [
    path('', CalendarEventListView.as_view(), name='calendar-events'),
]
