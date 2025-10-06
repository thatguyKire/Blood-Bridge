from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm

class CustomUserCreationForm(UserCreationForm):
    username = forms.EmailField(
        error_messages={
            'invalid': "Please enter a valid email address.",
            'unique': "That email is already registered.",
            'required': "Email is required.",
        }
    )

    password1 = forms.CharField(
        error_messages={
            'invalid': "Please enter a valid password.",
            'required': "Password is required.",
        }
    )

    password2 = forms.CharField(
        error_messages={
            'required': "Please confirm your password.",
            'invalid': "Passwords do not match.",
        }
    )

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']


class CustomAuthenticationForm(AuthenticationForm):
    username = forms.EmailField(
        error_messages={
            'required': "Email is required.",
            'invalid': "Please enter a valid email address.",
        }
    )

    password = forms.CharField(
        error_messages={
            'required': "Password is required.",
            'invalid': "Incorrect password.",
        }
    )