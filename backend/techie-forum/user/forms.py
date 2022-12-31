from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms import ModelForm
from .models import User, Profile


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields
        # require some attributes (is_anonymous, required_field => result errors


class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = User
        fields = UserChangeForm.Meta.fields


class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = [
            "firstName",
            "lastName",
            "bio",
            "avatar",
            "createdDate",
            "updatedDate",
        ]
