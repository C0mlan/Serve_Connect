from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Service
from .serializers import ServiceSerializer
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_service(request):
    service = Service.objects.exclude(user=request.user)
    serializer = ServiceSerializer(service, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def single_service(request, pk):
    try:
        service = Service.objects.get(id=pk)
    except Service.DoesNotExist:
        return Response({'detail': 'Service not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ServiceSerializer(service)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_service(request):
    service = Service.objects.filter(user = request.user)
    serializer = ServiceSerializer(service, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer= ServiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    




