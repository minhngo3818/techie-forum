import factory
from factory.django import DjangoModelFactory

from models import User, Profile


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Faker("name")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    email = factory.LazyAttribute(lambda obj: '{}@gmail.com'.format(obj.username))


class ProfileFactory(DjangoModelFactory):
    class Meta:
        model: Profile
    owner = factory.SubFactory(UserFactory)
    display_name = factory.Faker("name")
