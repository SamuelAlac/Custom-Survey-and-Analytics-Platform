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
from django.utils import timezone

# Create your views here.

##### SECTIONS VIEW #####
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



##### SECTION DETAIL VIEW #####
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



##### SURVEYS VIEW #####
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



##### SURVEY DETAIL VIEW #####
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



##### CHOICE DETAIL VIEW #####
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



##### QUESTIONS VIEW #####
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



##### QUESTION DETAIL VIEW #####
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



##### SURVEY ASSIGNMENTS VIEW #####
class SurveyAssignmentsView(generics.ListCreateAPIView):
    queryset = SurveyAssignment.objects.all().order_by('-created_at')
    serializer_class = SurveyAssignmentSerializer
    authentication_classes = [JWTAuthentication]

    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]

    def get_permissions(self):
        permissions_map = {
            'GET': [IsAuthenticated],
            'POST': [IsAuthenticated, IsTeacherOrAdmin],
        }
        permission_classes = permissions_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

    def get_queryset(self):
        now = timezone.now()
        expired = SurveyAssignment.objects.filter(
            due_date__lt=now,
            status=SurveyAssignment.Types.ACTIVE
        )

        if expired.exists():
            expired.update(status=SurveyAssignment.Types.PAST_DUE)

        return super().get_queryset()


##### SURVEY ASSIGNMENT DETAIL VIEW #####
class SurveyAssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
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



##### SURVEY ASSIGNMENTS WITH SURVEY VIEW #####
class SurveyAssignmentsWithSurveyView(generics.ListCreateAPIView):
    queryset = SurveyAssignment.objects.all().order_by('-created_at')
    serializer_class = SurveyAssignmentWithSurveySerializer
    authentication_classes = [JWTAuthentication]

    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]

    def get_permissions(self):
        permissions_map = {
            'GET': [IsAuthenticated],
            'POST': [IsAuthenticated, IsTeacherOrAdmin],
        }
        permission_classes = permissions_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)



##### SURVEY ASSIGNMENT WITH SURVEY DETAIL VIEW #####
class SurveyAssignmentWithSurveyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SurveyAssignment.objects.all()
    serializer_class = SurveyAssignmentWithSurveySerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permission_map  = {
            'GET': [IsAuthenticated],
            'PUT': [IsAuthenticated, IsTeacherOrAdmin],
            'DELETE': [IsAuthenticated, IsAdmin]
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]



##### RESPONSES VIEW #####
class ResponsesView(generics.ListCreateAPIView):
    queryset = Response.objects.all().order_by('-created_at')
    serializer_class = ResponseSerializer
    authentication_classes = [JWTAuthentication]    

    def get_permissions(self):
        permissions_map = {
            'GET': [IsAuthenticated],
            'POST': [IsAuthenticated],
        }
        permission_classes = permissions_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(respondent=self.request.user)



##### RESPONSE DETAIL VIEW #####
class ResponseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Response.objects.all().order_by('-created_at')
    serializer_class = ResponseSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permission_map = {
            'GET': [IsAuthenticated],
            'PUT': [IsAuthenticated],
            'DELETE': [IsAuthenticated, IsTeacherOrAdmin]
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]


##### RESPONSES WITH ANSWERS VIEW #####
class ResponsesWithAnswerView(generics.ListCreateAPIView):
    queryset = Response.objects.all().order_by('-created_at')
    serializer_class = ResponseWithAnswerSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permissions_map = {
            'GET': [IsAuthenticated],
            'POST': [IsAuthenticated],
        }
        permission_classes = permissions_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(respondent=self.request.user)



##### RESPONSE WITH ANSWERS DETAIL VIEW #####
class ResponseWithAnswerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Response.objects.all().order_by('-created_at')
    serializer_class = ResponseWithAnswerSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permission_map = {
            'GET': [IsAuthenticated],
            'PUT': [IsAuthenticated],
            'DELETE': [IsAuthenticated, IsTeacherOrAdmin]
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]



##### SECTION SURVEY DETAIL VIEW #####
class SectionSurveyDetailView(generics.RetrieveAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSurveySerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permission_map  = {
            'GET': [IsAuthenticated],
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    


##### SURVEY ASSIGNMENT WITH RESPONSES DETAIL VIEW #####
class SurveyAssignmentWithResponsesDetailView(generics.RetrieveAPIView):
    queryset = SurveyAssignment.objects.all()
    serializer_class = SurveyAssignmentWithResponsesSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        permission_map  = {
            'GET': [IsAuthenticated],
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]