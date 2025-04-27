from rest_framework import serializers
from .models import Service, Interaction

class ServiceSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format="%d %b %Y, %I:%M %p", read_only=True)
    updated = serializers.DateTimeField(format="%d %b %Y, %I:%M %p", read_only=True)
    class Meta:
        model = Service
        fields = ["id", "title", "brief_des", "duration", "description", "expectation", "category","user","created","updated"]
        extra_kwargs={"user":{"read_only":True}}



class InteractionSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format="%d %b %Y, %I:%M %p", read_only=True)
    # username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Interaction
        fields = ["id", "user", "service","reason", "created"]
        extra_kwargs={"user":{"read_only":True},"service":{"read_only":True}}

class Interaction_Serializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format="%d %b %Y, %I:%M %p", read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Interaction
        fields = ["id", "user", "service", "username","reason", "created"]
        extra_kwargs={"user":{"read_only":True},"service":{"read_only":True}}