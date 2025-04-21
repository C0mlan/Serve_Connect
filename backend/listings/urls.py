from django.urls import path
from . import views

urlpatterns =[
    path('all_service/', views.all_service, name='allservice'),
    path('all_service/<int:pk>/', views.single_service, name='single_service'),

    path('user_service/', views.user_service, name='user_service'),
    path('create_service/', views.create_post, name='create_service'),
    
]