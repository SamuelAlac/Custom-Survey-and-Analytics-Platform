from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import login, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
from .serializers import MyTokenObtainPairSerializer, UserRegistrationSerializer, StudentRegistrationSerializer # UserLoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

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

        response = Response({
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
            secure=not request.get_host().startswith("localhost"),
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

        section_name = getattr(user, 'section_name', None)
        return Response({
            "message": "User registered successfully. Please verify your email to activate your account.",
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

    def get(self, request, token, *args, **kwargs):
        try:
            user = User.objects.get(verification_token=token)
        except User.DoesNotExist:
            return Response({"error": "Invalid verification token."}, status=status.HTTP_404_NOT_FOUND)

        if user.is_verified:
            return Response({"message": "Email already verified."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            user.is_verified = True
            user.is_active = True
            user.verification_token = None
            user.save()

        return Response({"message": "Email verified successfully. You can now log in."}, status=status.HTTP_200_OK)
        
# class StudentRegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = StudentRegistrationSerializer
#     permission_classes = [AllowAny]

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)








# class   CustomLoginView(LoginView):
#     def post(self, request):
#         user = authenticate(email=request.data['email'], password=request.data['password'])
#         if user:
#             remember_me = request.data.get('remember_me', False)
#             refresh = RefreshToken.for_user(user)

#             # Adjust token lifetime
#             if remember_me:
#                 refresh.set_exp(lifetime=timedelta(days=30))
#             else:
#                 refresh.set_exp(lifetime=timedelta(days=1))

#             access_token = refresh.access_token

#             user_data = UserLoginSerializer(user).data

#             response = Response({
#                 "detail": "Login successful",
#                 "user": user_data,
#                 "access": str(access_token),
#                 "refresh": str(refresh),
#             })

#             # Store tokens as cookies
#             response.set_cookie(
#                 "access", str(access_token),
#                 httponly=True,
#                 secure=not request.get_host().startswith("localhost"),
#                 samesite="Lax",
#                 max_age=60 * 60 * 24 * (30 if remember_me else 1)
#             )
#             response.set_cookie(
#                 "refresh", str(refresh),
#                 httponly=True,
#                 secure=not request.get_host().startswith("localhost"),
#                 samesite="Lax",
#                 max_age=60 * 60 * 24 * (30 if remember_me else 1)
#             )

#             return response

#         return Response({"detail": "Invalid credentials"}, status=400)
    