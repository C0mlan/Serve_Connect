from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

import re

class RegistrationSerializer(serializers.ModelSerializer):
   
    password2 = serializers.CharField(write_only = True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name','username', 'email', 'password', "password2"]
        extra_kwargs = {"password": {"write_only": True}}
    
    


    def create(self, validated_data):
        
        email = validated_data['email'].lower()
        password = validated_data['password']
        password2 = validated_data.pop('password2')  

        
        if password != password2:
            raise serializers.ValidationError({"password2": "Passwords do not match."})

        
        if len(password) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters long."})
        if not re.search(r"[!@#$%^&*()\-_=+\[\]{}|;:',.<>?/0-9]", password):
            raise serializers.ValidationError({"password": "Password must contain at least one special character or digit."})

        
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({"email": "Email already exists."})

        
        first_name = validated_data['first_name'].title()
        last_name = validated_data['last_name'].title()

        
        user = User(
            username=validated_data['username'],
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save()

        return user

    
   

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [ "id","account_type", "based_on", "org_name","org_type", "bio"]

def validate_password(value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not any(char in "!@#$%^&*()-_=+[]{}|;:',.<>?/0123456789" for char in value):
            raise serializers.ValidationError("Password must contain at least one special character or digit.")
        