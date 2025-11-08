from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from accounts.permissions import *
from config.pagination import StandardResultsSetPagination

# Create your views here.
class SectionsView(generics.ListCreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    authentication_classes = [JWTAuthentication]

    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name'] # case sensitive search
    filterset_fields = ['id'] # for exact match filter

    def get_permissions(self):
        permissions_map = {
            'GET': [AllowAny],
            'POST': [IsAuthenticated, IsTeacherOrAdmin],
        }
        permission_classes = permissions_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)
    
class SectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permission_map  = {
            'GET': [AllowAny],
            'PUT': [IsAuthenticated, IsTeacherOrAdmin],
            'DELETE': [IsAuthenticated, IsAdmin]
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class SurveysView(generics.ListCreateAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    authentication_classes = [JWTAuthentication]

    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title']
    filterset_fields = ['title']

    def get_permissions(self):
        permission_map = {
            'GET': [IsAuthenticated],
            'POST': [IsAuthenticated, IsTeacherOrAdmin]
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

class SurveyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permission_map = {
            'GET': [IsAuthenticated],
            'PUT': [IsAuthenticated, IsTeacherOrAdmin],
            'DELETE': [IsAuthenticated, IsTeacherOrAdmin]
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class ChoiceDetailView(generics.DestroyAPIView):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permission_map  = {
            'DELETE': [IsAuthenticated, IsAdmin]
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]

class QuestionsView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    authentication_classes = [JWTAuthentication]

    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['text'] # case sensitive search
    filterset_fields = ['id'] # for exact match filter

    def get_permissions(self):
        permission_map = {
            'GET': [IsAuthenticated],
            'POST': [IsAuthenticated, IsTeacherOrAdmin],
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]

class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permission_map  = {
            'GET': [IsAuthenticated],
            'PUT': [IsAuthenticated, IsTeacherOrAdmin],
            'DELETE': [IsAuthenticated, IsAdmin]
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]

class SurveyAssignmentView(generics.ListCreateAPIView):
    queryset = SurveyAssignment.objects.all().order_by('-created_at')
    serializer_class = SurveyAssignmentSerializer
    authentication_classes = [JWTAuthentication]

    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    # search_fields = ['name'] # case sensitive search
    # filterset_fields = ['id'] # for exact match filter

    def get_permissions(self):
        permissions_map = {
            'GET': [IsAuthenticated],
            'POST': [IsAuthenticated, IsTeacherOrAdmin],
        }
        permission_classes = permissions_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

class SurveyAssignmentDetailView(generics.DestroyAPIView):
    queryset = SurveyAssignment.objects.all()
    serializer_class = SurveyAssignmentSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permission_map  = {
            'GET': [IsAuthenticated],
            'PUT': [IsAuthenticated, IsTeacherOrAdmin],
            'DELETE': [IsAuthenticated, IsAdmin]
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
class ResponsesView(generics.ListCreateAPIView):
    queryset = Response.objects.all().order_by('-created_at')
    serializer_class = ResponseSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permissions_map = {
            'GET': [IsAuthenticated],
            'POST': [IsAuthenticated, IsTeacherOrAdmin],
        }
        permission_classes = permissions_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(respondent=self.request.user)