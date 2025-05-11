from django.contrib import admin
from .models import  Onetime, Profile,ForgotPassword

admin.site.register(Onetime)
admin.site.register(Profile)
admin.site.register(ForgotPassword)
