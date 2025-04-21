from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format="%d %b %Y, %I:%M %p")
    updated = serializers.DateTimeField(format="%d %b %Y, %I:%M %p")
    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ['user', 'created', 'updated']
