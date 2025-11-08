from rest_framework import serializers
from .models import *

class SectionSerializer(serializers.ModelSerializer):
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    updated_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # created_by = serializers.CharField(source='created_by.username', read_only=True)
    # updated_by = serializers.CharField(source='updated_by.username', read_only=True)

    class Meta:
        model = Section
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text']

class QuestionSerializer(serializers.ModelSerializer):
    question_choices = ChoiceSerializer(many=True, required=False)
    class Meta:
        model = Question
        fields = '__all__'

    def create(self, validated_data):
        choices_data = validated_data.pop('question_choices',[])
        question = Question.objects.create(**validated_data)
        if question.question_type == Question.Types.TEXT and choices_data:
            raise serializers.ValidationError("Short answer questions cannot have choices.")

        for choice_data in choices_data:
            Choice.objects.create(question=question, **choice_data)
        return question
    
    def update(self, instance, validated_data):
        choices_data = validated_data.pop('question_choices', None)
        instance.text = validated_data.get('text', instance.text)
        instance.question_type = validated_data.get('question_type', instance.question_type)
        instance.order = validated_data.get('order', instance.order)
        instance.save()

        if choices_data is not None:
            instance.question_choices.all().delete()
            for choice_data in choices_data:
                Choice.objects.create(question=instance, **choice_data)
        return instance

class SurveySerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    updated_by = serializers.StringRelatedField(read_only=True)
    survey_questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Survey
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'created_by', 'updated_by', 'survey_questions']

class SurveyAssignmentSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    updated_by = serializers.StringRelatedField(read_only=True)

    #read survey details and section details
    survey_details = SurveySerializer(source='survey', read_only=True)
    section_details = SectionSerializer(source='sections', many=True, read_only=True)

    survey = serializers.PrimaryKeyRelatedField(queryset=Survey.objects.all())
    sections = serializers.PrimaryKeyRelatedField(many=True, queryset=Section.objects.all())

    class Meta:
        model = SurveyAssignment
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'created_by', 'updated_by']

class AnswerSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())

    class Meta:
        model = Answer
        exclude = ['response']
        read_only_fields = ['created_at', 'updated_at']

class ResponseSerializer(serializers.ModelSerializer):
    respondent = serializers.StringRelatedField(read_only=True)
    response_answer = AnswerSerializer(many=True)

    class Meta:
        model = Response
        fields = '__all__'
        read_only_fields = ['respondent', 'created_at', 'updated_at']

    def create(self, validated_data):
        answers_data = validated_data.pop('response_answer', [])
        response = Response.objects.create(**validated_data)

        for answer_data in answers_data:
            Answer.objects.create(response=response, **answer_data)

        return response
