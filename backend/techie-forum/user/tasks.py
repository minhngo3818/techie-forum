from techies.celery import app
from django.utils import timezone
from datetime import timedelta
from user.models import DeletedUser


@app.task
def delete_inactive_users(midnight, *args, **kwargs):
    # midnight = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
    deleted_users = DeletedUser.objects.filter(
        deleted_at__lt=midnight - timedelta(seconds=30)
    )

    for deleted_user in deleted_users:
        username = deleted_user.user.username
        deleted_user.user.delete()
        print(f"Deleted user: {username}")
        print("\x1b[30;42m" + "Success!" + "\x1b[0m")
