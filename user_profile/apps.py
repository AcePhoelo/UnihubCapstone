from django.apps import AppConfig


class ProfileConfig(AppConfig):  # Renamed to match the app name
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_profile'

    def ready(self):
        import user_profile.signals  # noqa: F401 - Import is required to register signals