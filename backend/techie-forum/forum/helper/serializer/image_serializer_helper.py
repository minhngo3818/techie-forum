from django.db import transaction
from forum.models import Image


def create_multiple_images(images, post):
    if images is not None:
        with transaction.atomic():
            for image in images:
                Image.objects.create(post=post, image=image)


def update_multiple_images(images, post):
    if images is not None:
        Image.objects.filter(post=post.id).delete()

        with transaction.atomic():
            for image in images:
                Image.objects.create(post=post, image=image)
