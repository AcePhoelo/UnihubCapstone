from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import OrderingFilter
from .models import Feedback
from .serializers import FeedbackSerializer

class FeedbackPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class FeedbackListCreateView(ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = FeedbackPagination
    filter_backends = [OrderingFilter]
    ordering_fields = ['created_at', 'satisfaction']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Feedback.objects.all()
        event_id = self.request.query_params.get('event_id')
        user_id = self.request.query_params.get('user_id')
        if event_id:
            queryset = queryset.filter(event_id=event_id)
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)