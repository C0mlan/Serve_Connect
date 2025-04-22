from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

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
        email = attrs.get('email')
        password = attrs.get('password')
        password2 = attrs.get('password2')


        if password != password2:
            raise serializers.ValidationError({"password2": "Passwords do not match!"})
            
        email = email.lower()
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({"email": "Email already exists"})

        attrs['email'] = email

        return attrs
          
        

    def save(self):
        validated = self.validated_data
        account =User.objects.create_user(
            email=validated['email'],
            username=validated['username'],
            first_name=validated['first_name'].title(),
            last_name=validated['last_name'].title(),
            password=validated['password'],
        )

        return account
    

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [ "id","account_type", "based_on", "org_name","org_type", "bio"]
        