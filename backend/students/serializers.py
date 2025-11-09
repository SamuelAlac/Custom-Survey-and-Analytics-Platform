# from rest_framework import serializers
# from core.serializers import *
# from core.models import *
# from .models import *

# class StudentProfileSerializer(serializers.ModelSerializer):
#     section = SectionSurveySerializer(read_only=True)
#     section_name = serializers.SerializerMethodField()

#     class Meta:
#         model = StudentProfile
#         fields = '__all__'

#     def get_section_name(self, obj):
#         if obj.section:
#             return obj.section.name
#         return None

# class StudentAccountSerializer(serializers.ModelSerializer):
#     studentprofile = StudentProfileSerializer(read_only=True)

#     class Meta:
#         model = User
#         fields = ['first_name', 'last_name', 'email', 'role', 'studentprofile']