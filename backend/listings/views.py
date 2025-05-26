from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Service, Interaction
from .serializers import ServiceSerializer, InteractionSerializer,Interaction_Serializer
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from drf_spectacular.utils import extend_schema


@extend_schema(responses={200: ServiceSerializer},
               methods = ['GET'],
               request= ServiceSerializer,)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_service(request):
    # Returns a list of all services except those created by the currently authenticated user
    service = Service.objects.exclude(user=request.user)
    serializer = ServiceSerializer(service, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK)

@extend_schema(responses={200: ServiceSerializer},
               methods = ['GET'],
               request= ServiceSerializer,)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def single_service(request, pk):
    # Retrieves and returns a single service by its ID
    try:
        service = Service.objects.get(id=pk)
    except Service.DoesNotExist:
        return Response({'detail': 'Service not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ServiceSerializer(service)
    return Response(serializer.data, status=status.HTTP_200_OK)

@extend_schema(responses={200: ServiceSerializer},
               methods = ['PUT'],
               request= ServiceSerializer,)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_service(request, pk):
    # Allows the user to update their own service by ID
    
    service = Service.objects.get(id=pk, user=request.user)
  
    serializer = ServiceSerializer(instance=service, data=request.data, partial=True) 
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(responses={200: ServiceSerializer},
               methods = ['GET'],
               request= ServiceSerializer,)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_service(request):
    # Retrieves and returns all services created by the user
    service = Service.objects.filter(user = request.user)
    serializer = ServiceSerializer(service, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK)


@extend_schema(responses={200: ServiceSerializer},
               methods = ['POST'],
               request= ServiceSerializer,)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer= ServiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(methods = ['DELETE'],
               responses={204}
               )
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_service(request, pk):
    # Deletes a service created by the authenticated user
    service = Service.objects.get(id=pk, user=request.user)
    service.delete()
    return Response({"message": "Service deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

@extend_schema(responses={201: InteractionSerializer},
               methods = ['POST'],
               request= InteractionSerializer,)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_reason(request, pk):
    # Creates a new interaction with a given service
    try:
        service = Service.objects.get(id=pk)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)
   
    serializer= InteractionSerializer(data=request.data)
    
    if serializer.is_valid():
        try:
            serializer.save(user=request.user, service=service)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'error': "User can only make one interation on a service"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@extend_schema(responses={200: Interaction_Serializer},
               methods = ['GET'],
               request= Interaction_Serializer,)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_interaction(request, pk):
    # Retrieves all interactions for a specific service by its ID

    service = Interaction.objects.filter(service=pk)
    serializer = Interaction_Serializer(service, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK)

@extend_schema(responses={200: Interaction_Serializer},
               methods = ['GET'],
               request= Interaction_Serializer,)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def volunteer_interaction(request):
    # Retrieves all interactions created by the authenticated user
    interaction = Interaction.objects.filter(user=request.user)
    serializer = Interaction_Serializer(interaction, many=True)
    return Response(serializer.data,status=status.HTTP_200_OK )
 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def interaction_state(request, pk):
    state= request.data.get('state')
    
    try:
        interaction = Interaction.objects.get(id=pk)
    except Interaction.DoesNotExist:
        return Response({"detail": "Interaction not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the requesting user is the creator of the related service
    if interaction.service.user != request.user:
        return Response({"detail": "You do not have permission to modify this interaction."},
                        status=status.HTTP_403_FORBIDDEN)
    if state == "ACCEPT":
        interaction.state = 1
        interaction.save()
        return Response({"detail": "Seeker has accepted interaction"}, status=status.HTTP_200_OK)
    elif state == "DECLINE":
        interaction.state = 0
        interaction.save()
        return Response({"detail": "seeker has declined interation"},status=status.HTTP_200_OK)
    else:
        return Response({"detail": "Invalid state value."}, status=status.HTTP_400_BAD_REQUEST) 



