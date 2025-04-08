from django.contrib.auth.models import User
from rest_framework import serializers

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only = True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name','username', 'email', 'password', "password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not any(char in "!@#$%^&*()-_=+[]{}|;:',.<>?/" for char in value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value
     
    def validate(self, attrs):
        
        if 'email' not in attrs:
            raise serializers.ValidationError({"email": "Email is required!"})
        
        if 'first_name' not in attrs:
            raise serializers.ValidationError({"first_name": "First name is required!"})
        if 'last_name' not in attrs:
            raise serializers.ValidationError({"last_name": "Last name is required!"})
        
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password2": "Passwords do not match!"})

        email = attrs['email'].lower()
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email already exists"})

        return attrs

    def save(self):
        email = self.validated_data['email']
        first_name = self.validated_data['first_name'].capitalize()
        last_name = self.validated_data['last_name'].capitalize()
        username = self.validated_data['username']
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({"password2": "password do not match!"})
        
        if User.objects.filter(email =self.validated_data['email']).exists():
            raise serializers.ValidationError({"email":"Email already exists"})
        
    
        account =User.objects.create_user(
            email= email,
            username= username,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )

        return account

