from django.db import models
from django.contrib.auth.models import User


class Service(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, null = True, blank = True)
    brief_des = models.TextField(max_length=200, null = True, blank = True)
    duration= models.CharField(max_length=100, null = True, blank = True)
    description = models.TextField(max_length=200, null = True,blank = True)
    expectation =  models.JSONField(default=list, null = True, blank = True)
    category = models.TextField(max_length=50, null =True,blank = True)
    based_on = models.JSONField(default=list, null = True, blank = True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'{self.title} {self.user.username}'
