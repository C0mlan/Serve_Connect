from django.shortcuts import render
from .serializers import RegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .utils import Util, generate_otp
from .models import User, Onetime

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    '''This view saves a new user, 
    generates an OTP(One Time Password) and saves the OTP in the OneTime model table.
      After the OTP has been generated, an email is sent to the new user'''
    
    if request.method == "POST":
        serializer= RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_data = serializer.data

            # #"generate_otp' generates the otp
            # email_otp = generate_otp()
            # Onetime.objects.create(user=user, otp=email_otp)
           
            # user = User.objects.get(email=user_data['email'])
            # email_body= f'''<h2>Email Verification OTP</h2><br><br>
            #                <h3> 
            #                 <p>Hi {user.username},</p><br>
            #                 <p>Your One-Time Password (OTP) for email verification is: <strong>{email_otp}<strong>.</p><br>
            #                 <p>Please use this code to verify your account.Thank you.</p><br>
            #                 </h3>
            #                 <br><br><br>
            #                 '''
            # data = {
            #     'email_body': email_body,
            #     'to_email': user.email,
            #     'email_subject': 'Email OTP'
            # }
            # Util.send_email(data)

            response_data = {
                "response": "Account has created.",
                "user" :serializer.data  
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

