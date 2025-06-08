from django.shortcuts import render
from .serializers import RegistrationSerializer, ProfileSerializer, validate_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .utils import Util, generate_otp
from .models import User, Onetime,Profile, ForgotPassword
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from drf_spectacular.utils import extend_schema
from django.core.exceptions import ValidationError
from .email import send_otp_email






@extend_schema(responses={201: RegistrationSerializer},
               methods = ['POST'])
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    '''
    handles user registration by validating the input data,
    creating a new user, generating a one-time password (OTP),
    saving the OTP to the database, and sending it to the user via email.
    
    '''
    
    serializer= RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        
        user = serializer.save()
        email_otp = generate_otp() # "generate_otp" generates the otp
        Onetime.objects.create(user=user, otp=email_otp) #saves the otp of a user
        send_otp_email(user.username, user.email, email_otp) # sends the otp to the user via email
        response_data = {
            "response": "Account has been created.",
            "user" :serializer.data  
        }
    
        return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(
    methods=['POST'],
    request=None,  # Or define a serializer if needed
    responses={200: {'type': 'object', 'properties': {'message': {'type': 'string'}}}},)
@api_view(['POST'])
@permission_classes([AllowAny])
def userverification(request):
    '''This view verifies a user's OTP (one-time password). 
    If the OTP is valid and the user is not yet verified,
    marks them as verified.'''

    otpcode=request.data.get('otp')
    try:
        user_code=Onetime.objects.get(otp=otpcode)
        if not user_code.is_verified:
            user_code.is_verified=True
            user_code.save()

            user = user_code.user
            # refresh = RefreshToken.for_user(user)
            return Response({
            'message': "Account has been verified",
            # 'access_token': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
    except Onetime.DoesNotExist:
        return Response({'message':"Invalid otp"}, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(
    methods=['PATCH'],
    request=ProfileSerializer,
    responses={200: ProfileSerializer},
)
@api_view(['PATCH'])
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
                "based_on":profile.based_on,
                "is_verified": verify.is_verified
            }
        return Response(response_data , status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    methods=['POST'],
    responses={200},
)
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
            "org_type": profile.org_type,
            "bio": profile.bio
        }, status=status.HTTP_200_OK)
     
    return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@extend_schema(
    methods=['PATCH'],
    responses={200},
)
    
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def forgot_password(request):
    password = request.data.get("password")
    password2 =request.data.get("password2")

    
    if password != password2:
        return Response({"detail": "Passwords do not match!"}, status=status.HTTP_400_BAD_REQUEST)
    if not password:
        return Response({"detail": "New password is required."}, status=status.HTTP_400_BAD_REQUEST) 
    
    try:
        validation_error = validate_password(password)
    except ValidationError as e:
        return Response({"detail": e.messages}, status=status.HTTP_400_BAD_REQUEST)
    user = request.user
    user.set_password(password)
    return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def otp_forgetpassword(request):
    email = request.data.get("email")
    if not User.objects.filter(email=email).exists():
        return Response({"error": "User with this email does not exist."}, status=404)
    user = User.objects.get(email=email)
    email_otp = generate_otp() # "generate_otp" generates the otp
    forgot_record = ForgotPassword.objects.create(user=user, password_otp=email_otp)
    send_otp_email(user.username, user.email, email_otp)
    return Response({"message": "OTP sent to your email."}, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_passwordotp(request):
    otp = request.data.get('otp')

    try:
        user_code= ForgotPassword.objects.get(password_otp=otp)
        if not user_code.password_verify:
            user_code.password_verify = True
            user_code.save()
            user= user_code.user
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "you are allowed to change password",
                "access_token": str(refresh.access_token)
                })
    except ForgotPassword.DoesNotExist:
        return Response({"message":"Invalid otp"}, status = status.HTTP_400_BAD_REQUEST)


    