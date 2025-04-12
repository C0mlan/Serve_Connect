from django.db import models
from django.contrib.auth.models import User

class Onetime(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp= models.CharField(max_length=10)
    is_verified=models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.otp} {self.user.username}'
    

class Profile(models.Model):
    AccountType = [
    ('Volunteer', 'VOLUNTER'),
    ('Individual', 'SEEKING VOLUNTEER(INDIVIDUAL)'),
    ('Organizzation', 'SEEKING VOLUNTEER(ORGANISATION)')
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    prof_updated = models.BooleanField(default=False)
    account_type = models.CharField(choices= AccountType, max_length=100)
    org_name = models.CharField(max_length=100)
    based_on = models.JSONField(default=list)
    bio =  models.CharField(max_length=200)

    def __str__(self):
        return str(self.user.username)
