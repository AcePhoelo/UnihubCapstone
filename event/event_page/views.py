from rest_framework import generics
from .models import ClubEventPage
from .serializers import ClubEventPageSerializer

class ClubEventPageDetailView(generics.RetrieveAPIView):
    queryset = ClubEventPage.objects.all()
    serializer_class = ClubEventPageSerializer