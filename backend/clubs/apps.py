from django.apps import AppConfig

class ClubpageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'clubs'

    def ready(self):
        pass
    
