from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Volunteer
from .serializers import VolunteerSerializer
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_service(request):
    service = Volunteer.objects.exclude(user=request.user)
    serializer = VolunteerSerializer(service, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user(request):
    service = Volunteer.objects.filter(user = request.user)
    serializer = VolunteerSerializer(service, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK)


    




