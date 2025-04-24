from django.shortcuts import render
from .serializers import RegistrationSerializer, ProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .utils import Util, generate_otp
from .models import User, Onetime,Profile
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

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

            #"generate_otp' generates the otp
            email_otp = generate_otp()
            Onetime.objects.create(user=user, otp=email_otp)
           
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
    

@api_view(['POST'])
@permission_classes([AllowAny])
def userverification(request):
    '''This view verifies a user's OTP (one-time password). 
    If the OTP is valid and the user is not yet verified,
    marks them as verified and returns a JWT access token.'''

    otpcode=request.data.get('otp')
    try:
        user_code=Onetime.objects.get(otp=otpcode)
        if not user_code.is_verified:
            user_code.is_verified=True
            user_code.save()

            user = user_code.user
            refresh = RefreshToken.for_user(user)
            return Response({
            'message': "Account has been verified",
            'access_token': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
        return Response({'message':"Account already verified"}, status=status.HTTP_204_NO_CONTENT)
    except Onetime.DoesNotExist:
        return Response({'message':"Invalid otp"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    try:
        profile = request.user.profile 
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
    serializer = ProfileSerializer(instance=profile,data=request.data)
    if serializer.is_valid():
        profile = serializer.save(user=request.user)
        profile.prof_updated = True
        profile.save()
        verify = Onetime.objects.get(user=request.user)
        response_data = {
               "message": "Profile updated successfully!",
                "account_type" :profile.account_type,
                "prof_up": profile.prof_updated,
                "is_verified": verify.is_verified
            }
        return Response(response_data , status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):

    '''This view handles user login by allowing authentication through either a username or email,
    along with a password. 
    It first checks if both fields are provided. 
    Then, it looks up the user based on the identifier type (email or username). 
    If the user exists and the password is correct,
    it authenticates the user and returns JWT tokens (access and refresh), 
    user information, verification status, and profile update status.'''


    identifier = request.data.get("identifier")
    password = request.data.get("password")

    if not identifier or not password:
        return Response(
            {"error": "Username and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )
    try:
        if "@" in identifier:
            user =User.objects.get(email=identifier)
        else:
            user=User.objects.get(username=identifier)
    except (User.DoesNotExist):
        return Response(
            {"error": "Invalid  User details. "},
            status=status.HTTP_401_UNAUTHORIZED
        )
 
    user = authenticate(username=user.username, password=password)
    
 
    if user is not None:
        refresh = RefreshToken.for_user(user)
        verify = Onetime.objects.get(user=user)
        profile = Profile.objects.get(user=user)

        return Response({
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "token_type": "bearer",
            "is_verified": verify.is_verified,
            'logged_user': user.id,
            "username": user.username,
            "email": user.email,
            "first_name":user.first_name,
            "last_name":user.last_name,
            "profile_update": profile.prof_updated,
            "account_type": profile.account_type,
            "based_on": profile.based_on,
            "org_name": profile.org_name,
            "bio": profile.bio
        }, status=status.HTTP_200_OK)
     
    return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


    
