from django.urls import path
from . import views

urlpatterns =[
    path('all_service/', views.all_service, name='allservice'),
    path('all_service/<str:pk>/', views.single_service, name='single_service'),
    path('all_service/edit/<str:pk>/', views.edit_service, name='edit_service'),
    path('user_service/', views.user_service, name='user_service'),
    path('create_service/', views.create_post, name='create_service'),
    path('all_service/delete/<str:pk>/', views.delete_service, name='delete_service'),
    path('all_service/<str:pk>/create_reason/', views.create_reason, name='create_reason'),
   
]