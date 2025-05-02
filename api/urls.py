from django.urls import path
from .views import login_view, set_csrf_cookie

urlpatterns = [
    path("login/", login_view, name="login"),
    path("csrf/", set_csrf_cookie, name="set_csrf_cookie"),
]