from django.apps import AppConfig

class EventPageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'event.event_page'

def ready(self):
    import event.event_page.signals


