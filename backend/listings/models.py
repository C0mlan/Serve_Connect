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
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'{self.title} {self.user.username}'
    class Meta:
        ordering = ['-created']
    
class Interaction(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    reason = models.TextField(max_length=200,null =True,blank = True)
    state = models.IntegerField(default=2)
    created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Interaction with {self.service.title} X {self.reason}"
    class Meta:
        ordering = ['-created'] #this orders from the most recent 


    
    
