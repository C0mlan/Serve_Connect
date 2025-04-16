from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class Onetime(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp= models.CharField(max_length=10)
    is_verified=models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.otp} {self.user.username}'
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    prof_updated = models.BooleanField(default=False)
    account_type = models.CharField(max_length=100,)
    org_name = models.CharField(max_length=100, null = True,blank=True)
    based_on = models.JSONField(default=list, null = True,blank=True)
    bio =  models.CharField(max_length=200, null= True, blank=True)

    def __str__(self):
        return str(self.user.username)

#to create a profile automantically after a User is create
def create_profile(sender, instance, created, **kwargs):
    if created:
        user_profile = Profile(user=instance)
        user_profile.save()

post_save.connect(create_profile, sender=User)