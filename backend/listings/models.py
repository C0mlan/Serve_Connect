from django.db import models
from django.contrib.auth.models import User


class Service(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, null = True)
    brief_des = models.TextField(max_length=200, null = True)
    duration= models.CharField(max_length=100, null = True)
    description = models.TextField(max_length=200, null = True)
    expectation =  models.JSONField(default=list, null = True)
    category = models.TextField(max_length=50, null =True)
    based_on = models.JSONField(default=list, null = True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'{self.title} {self.user.username}'
