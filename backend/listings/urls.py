from django.urls import path
from . import views

urlpatterns =[
    path('list_service/', views.list_service, name='list_service'),
]