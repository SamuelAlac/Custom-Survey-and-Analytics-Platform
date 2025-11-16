from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response as DRFResponse
from django.contrib.auth import login, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
from .serializers import *
from core.serializers import *
from core.models import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.utils import timezone
from django.core.mail import send_mail

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data  # Contains access & refresh tokens
        remember_me = request.data.get("remember_me", False)
        access_token = data['access']
        refresh_token = data['refresh']

        response = DRFResponse({
            "detail": "Login successful",
            "access": access_token,
            "refresh": refresh_token
        })
        response.delete_cookie("access")
        response.delete_cookie("refresh")

        max_age_seconds = 60 * 60 * 24 * (30 if remember_me else 1)
        response.set_cookie(
            "access", access_token,
            httponly=True,
            secure= not request.get_host().startswith("localhost"),
            samesite="Lax",
            max_age=max_age_seconds
        )
        response.set_cookie(
            "refresh", refresh_token,
            httponly=True,
            secure=not request.get_host().startswith("localhost"),
            samesite="Lax",
            max_age=max_age_seconds
        )

        return response

User = get_user_model()
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        section_name = serializer.data.get('section_name')
        return DRFResponse({
            "message": "User registered successfully. Please verify your email using the code sent.",
            "user": {
                "id": str(user.id),
                "username": user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                "email": user.email,
                'section': section_name,
                'terms_and_condition': user.terms_and_condition,
            }
        }, status=status.HTTP_201_CREATED)
    

class VerifyEmailView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    #FOR VERIFICATION THRU EMAIL BEFORE
    def get(self, request, token, *args, **kwargs):
        try:
            user = User.objects.get(verification_token=token)
        except User.DoesNotExist:
            return DRFResponse({"error": "Invalid verification token."}, status=status.HTTP_404_NOT_FOUND)

        if user.is_verified:
            return DRFResponse({"message": "Email already verified."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            user.is_verified = True
            user.is_active = True
            user.verification_token = None
            user.save()

        return DRFResponse({"message": "Email verified successfully. You can now log in."}, status=status.HTTP_200_OK)

class VerifyEmailCodeView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        if not isinstance(request.data, dict):
            return Response({"error": "Invalid payload format. Must be JSON object with 'email' and 'code'."}, status=400)

        email = request.data.get('email')
        code = request.data.get('code')

        if not email or not code:
            return DRFResponse({'error': 'Email and code are required.'}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return DRFResponse({"error": "User not found."}, status=404)

        if user.is_verified:
            return DRFResponse({"message": "Email already verified."}, status=400)

        if user.verification_code != code:
            return DRFResponse({"error": "Invalid verification code."}, status=400)

        if user.code_expiration < timezone.now():
            return DRFResponse({"error": "Verification code expired."}, status=400)
        
        with transaction.atomic():
            user.is_verified = True
            user.is_active = True
            user.verification_code = None
            user.code_expiration = None
            user.save()

        return DRFResponse({"message": "Email verified successfully! You can now log in."}, status=200)

    
class ResendVerificationCodeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return DRFResponse({"error": "Email is required."}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return DRFResponse({"error": "User not found."}, status=404)

        if user.is_verified:
            return DRFResponse({"message": "Email already verified."}, status=400)

        # Generate new code
        code = user.generate_verification_code()

        subject = "Resend: Your Email Verification Code"
        message = f"Your new verification code is: {code}. It will expire in 10 minutes."
        send_mail(
            subject,
            message,
            'samuelalac21@gmail.com',
            [user.email],
            fail_silently=False,
        )

        return DRFResponse({"message": "Verification code resent successfully."}, status=200)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
        except Exception:
            return DRFResponse({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        
        response = DRFResponse({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)
        response.delete_cookie('access')
        response.delete_cookie('refresh')

        return response

class AccountView(generics.RetrieveAPIView):
    serializer_class = AccountSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserSurveyDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSurveySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_permissions(self):
        permission_map  = {
            'GET': [IsAuthenticated],
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
class UserResponseDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserResponseSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_permissions(self):
        permission_map  = {
            'GET': [IsAuthenticated],
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
class SectionStudentsView(generics.ListAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionStudentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_permissions(self):
        permission_map  = {
            'GET': [AllowAny],
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]