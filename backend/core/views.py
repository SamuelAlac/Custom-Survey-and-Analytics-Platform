from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Section, Survey
from .serializers import SectionSerializer, SurveySerialier
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.authentication import CookieJWTAuthentication
from accounts.permissions import IsTeacherOrAdmin, IsAdmin
from config.pagination import StandardResultsSetPagination

# Create your views here.
class SectionsView(generics.ListCreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    # authentication_classes = [JWTAuthentication]
    authentication_classes = [CookieJWTAuthentication]

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
    # authentication_classes = [JWTAuthentication]
    authentication_classes = [CookieJWTAuthentication]

    def get_permissions(self):
        permission_map  = {
            'GET': [AllowAny],
            'PUT': [IsAuthenticated(), IsTeacherOrAdmin()],
            'DELETE': [IsAuthenticated(), IsAdmin()]
        }
        permission_classes = permission_map.get(self.request.method, [IsAuthenticated])
        return [permission() for permission in permission_classes]
    
    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class SurveysView(generics.ListCreateAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerialier
    # authentication_classes = [JWTAuthentication]
    authentication_classes = [CookieJWTAuthentication]

    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title']
    filterset_fields = ['title']

    def get_permissions(self):
        method_permissions = {
            'GET': [IsAuthenticated()],
            'POST': [IsAuthenticated(), IsTeacherOrAdmin()]
        }
        return method_permissions.get(self.request.method, [IsAuthenticated()])
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

class SurveyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerialier
    # authentication_classes = [JWTAuthentication]
    authentication_classes = [CookieJWTAuthentication]

    def get_permissions(self):
        method_permissions = {
            'GET': [IsAuthenticated()],
            'PUT': [IsAuthenticated(), IsTeacherOrAdmin()],
            'DELETE': [IsAuthenticated(), IsTeacherOrAdmin()]
        }
        return method_permissions.get(self.request.method, [IsAuthenticated()])
    
    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


#-------------------------------------------
# I USED APIView Here Instead of Generics
# class SectionsView(APIView):
#     authentication_classes = [JWTAuthentication]

#     def get_permissions(self):
#         method_permissions = {
#             'GET': [IsAuthenticated()],
#             'POST': [IsAuthenticated(), IsTeacherOrAdmin()]
#         }
#         return method_permissions.get(self.request.method, [IsAuthenticated()])

#     def get(self, request):
#         sections = Section.objects.all()
#         serializer = SectionSerializer(sections, many=True)
#         return Response(serializer.data)
    
#     def post(self, request):
#         serializer = SectionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class SectionDetailView(APIView):
#     authentication_classes = [JWTAuthentication]

#     def get_permissions(self):
#         method_permissions = {
#             'GET': [IsAuthenticated()],
#             'PUT': [IsAuthenticated(), IsTeacherOrAdmin()],
#             'DELETE': [IsAuthenticated(), IsTeacherOrAdmin()]
#         }
#         return method_permissions.get(self.request.method, [IsAuthenticated()])
    
#     def get_object(self, pk):
#         return get_object_or_404(Section, id=pk)
    
#     def get(self, request, pk):
#         section = self.get_object(pk)
#         serializer = SectionSerializer(section)
#         return Response(serializer.data)
    
#     def put(self, request, pk):
#         section = self.get_object(pk)
#         serializer = SectionSerializer(section, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def delete(self, request, pk):
#         section = self.get_object(pk)
#         section.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    