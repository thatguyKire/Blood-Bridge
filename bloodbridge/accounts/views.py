from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

# Create your views here.
def index_view(request):
    login_form = AuthenticationForm()
    registration_form = UserCreationForm()

    return render(request, "index.html", {
        "login_form": login_form, 
        "registration_form": registration_form
    })

def register_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("registration_success")
        else:
            login_form = AuthenticationForm()
            return render(request, "index.html", {
                "login_form": login_form, 
                "registration_form": form,
                "open_modal": "register"
            })
    return redirect("index")

def registration_success_view(request):
    return render(request, "registration_success.html")

def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)  # ✅ bind submitted data
        if form.is_valid():
            user = form.get_user()
            login(request, user)  # ✅ log in user
            return redirect("home")  # or wherever your dashboard is
        else:
            registration_form = UserCreationForm()
            return render(request, "index.html", {
                "login_form": form, 
                "registration_form": registration_form,
                "open_modal": "login"
            })
    return redirect("index")    

def home_view(request):
    return render(request, "home.html")

