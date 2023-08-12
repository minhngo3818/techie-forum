from __future__ import absolute_import, unicode_literals
import os

from celery import Celery

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "techies.settings"
)  # <project-name>.settings

app = Celery(
    "celery_app", broker=os.getenv("CELERY_BROKER"), backend=os.getenv("CELERY_BACKEND")
)

app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
