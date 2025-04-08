from django.shortcuts import render
from .serializers import RegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    if request.method == "POST":
        serializer= RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            response_data = {
                "response": "Account has created.",
                **serializer.data  
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        else:
            data=serializer.errors
            return Response(data, status=status.HTTP_400_BAD_REQUEST)