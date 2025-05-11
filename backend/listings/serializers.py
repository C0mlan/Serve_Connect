from rest_framework import serializers
from .models import Service, Interaction

class ServiceSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format="%d %b %Y, %I:%M %p", read_only=True)
    updated = serializers.DateTimeField(format="%d %b %Y, %I:%M %p", read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name= serializers.CharField(source='user.last_name', read_only=True)
    org_name =serializers.CharField(source='user.profile.org_name', read_only=True)
    org_type =serializers.CharField(source='user.profile.org_type', read_only=True)
 
   


    class Meta:
        model = Service
        fields = ["id", "title", 
                  "brief_des", "duration", 
                  "description", "expectation", 
                  "category","user",
                  "created","updated", 
                  "first_name", "last_name",
                  "org_type", "org_name"]
        extra_kwargs={"user":{"read_only":True}}



class InteractionSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format="%d %b %Y, %I:%M %p", read_only=True)
    # username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Interaction
        fields = ["id", "user", "service","reason", "created", "state"]
        extra_kwargs={"user":{"read_only":True},"service":{"read_only":True}}

class Interaction_Serializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format="%d %b %Y, %I:%M %p", read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    title = serializers.CharField(source='service.title', read_only=True)
   
    class Meta:
        model = Interaction
        fields = ["id", "user", "service", "username","reason", "created", "title", "state"]
        extra_kwargs={"user":{"read_only":True},"service":{"read_only":True}}