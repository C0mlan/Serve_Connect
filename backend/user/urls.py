from django.urls import path
from . import views

urlpatterns =[
    path('register/', views.register_view, name = 'register'),
    path('user-ver/', views.userverification, name = 'verication'),
    path("update-profile/", views.update_profile, name="update-profile"),
    
]