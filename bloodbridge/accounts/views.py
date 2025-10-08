from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .forms import CustomUserCreationForm as CustomCreation
from .forms import CustomAuthenticationForm as CustomAuthentication


# Index view
def index_view(request):
    login_form = CustomAuthentication()
    registration_form = CustomCreation()

    if request.user.is_authenticated:  # di na siya kabalik sa /index url if logged in
        return redirect("home")

    return render(request, "index.html", {
        "login_form": login_form,
        "registration_form": registration_form
    })


# Registration view
def register_view(request):
    if request.method == "POST":
        form = CustomCreation(request.POST)
        if form.is_valid():
            form.save()
            logout(request)
            return render(request, "index.html", {
                "registration_success": True,
                "login_form": CustomAuthentication(),
                "registration_form": CustomCreation(),
            })
        else:
            return render(request, "index.html", {
                "login_form": CustomAuthentication(),
                "registration_form": form,
                "open_modal": "register"
            })
    return redirect("index")


# Login view
def login_view(request):
    if request.user.is_authenticated:  # di na siya kabalik sa /login url if logged in
        return redirect("home")
    
    if request.method == "POST":
        form = CustomAuthentication(request, data=request.POST)  # bind submitted data
        if form.is_valid():
            user = form.get_user()
            login(request, user)  # log in user
            return redirect("home")  # go to home page
        else:
            registration_form = CustomCreation()
            return render(request, "index.html", {
                "login_form": form,
                "registration_form": registration_form,
                "open_modal": "login"
            })
    return redirect("index")


# Logout view
def logout_view(request):
    logout(request)
    return redirect("index")


# Home view
def home_view(request):
    if not request.user.is_authenticated:  # di maka access sa /home if not logged in
        return redirect("index")
    return render(request, "index.html")
