# from django.shortcuts import render
# from rest_framework import generics, status
# from .models import *
# from .serializers import *
# from accounts.models import *
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework.permissions import IsAuthenticated


# # Create your views here.
# class StudentProfileDetailView(generics.RetrieveAPIView):
#     queryset = StudentProfile.objects.all()
#     serializer_class = StudentProfileSerializer

#     def get_permissions(self):
#         permission_map  = {
#             'GET': [IsAuthenticated],
#         }
#         permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
#         return [permission() for permission in permission_classes]
    
# class StudentAccountDetailView(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = StudentAccountSerializer

#     def get_permissions(self):
#         permission_map  = {
#             'GET': [IsAuthenticated],
#         }
#         permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
#         return [permission() for permission in permission_classes]