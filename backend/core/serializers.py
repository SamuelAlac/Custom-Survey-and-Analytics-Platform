from rest_framework import serializers
from .models import Section, Survey

class SectionSerializer(serializers.ModelSerializer):
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    updated_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # created_by = serializers.CharField(source='created_by.username', read_only=True)
    # updated_by = serializers.CharField(source='updated_by.username', read_only=True)

    class Meta:
        model = Section
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class SurveySerialier(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    updated_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Survey
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'created_by', 'updated_by']