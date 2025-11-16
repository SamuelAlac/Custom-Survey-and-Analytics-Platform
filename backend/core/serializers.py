from rest_framework import serializers
from .models import *

##### SECTION SERIALIZER #####
class SectionSerializer(serializers.ModelSerializer):
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    updated_by = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Section
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


##### CHOICE SERIALIZER #####
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text']

##### QUESTION SERIALIZER #####
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


##### SURVEY SERIALIZER #####
class SurveySerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    updated_by = serializers.StringRelatedField(read_only=True)
    survey_questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Survey
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'created_by', 'updated_by', 'survey_questions']


##### SURVEY ASSIGNMENT SERIALIZER #####
class SurveyAssignmentSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    updated_by = serializers.StringRelatedField(read_only=True)
    survey_name = serializers.SerializerMethodField()
    survey_description = serializers.SerializerMethodField()

    class Meta:
        model = SurveyAssignment
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'created_by', 'updated_by', 'survey_name','survey_description']

    def get_survey_name(self, obj):
        if obj.survey:
            return obj.survey.title
        return None
    
    def get_survey_description(self, obj):
        if obj.survey:
            return obj.survey.description
        return None


##### SURVEY ASSIGNMENT WITH SURVEY SERIALIZER #####
class SurveyAssignmentWithSurveySerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    updated_by = serializers.StringRelatedField(read_only=True)
    survey_details = SurveySerializer(source='survey', read_only=True)

    class Meta:
        model = SurveyAssignment
        fields = '__all__'
        # exclude = ['survey']
        read_only_fields = ['created_at', 'updated_at', 'created_by', 'updated_by']


##### ANSWER SERIALIZER #####
class AnswerSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    question_text = serializers.SerializerMethodField()
    question_type = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        exclude = ['response']
        read_only_fields = ['created_at', 'updated_at']

    def get_question_text(self, obj):
        if obj.question:
            return obj.question.text
        return None
    
    def get_question_type(self, obj):
        if obj.question:
            return obj.question.question_type
        return None



##### RESPONSE SERIALIZER #####
class ResponseSerializer(serializers.ModelSerializer):
    respondent = serializers.StringRelatedField(read_only=True)
    survey_assignment = SurveyAssignmentSerializer(read_only=True)

    class Meta:
        model = Response
        fields = '__all__'
        read_only_fields = ['respondent', 'created_at', 'updated_at']



##### RESPONSE WITH ANSWERS SERIALIZER #####
class ResponseWithAnswerSerializer(serializers.ModelSerializer):
    respondent = serializers.StringRelatedField(read_only=True)
    response_answer = AnswerSerializer(many=True)
    survey_name = serializers.SerializerMethodField()

    class Meta:
        model = Response
        fields = '__all__'
        read_only_fields = ['respondent', 'created_at', 'updated_at', 'survey_name']

    def get_survey_name(self, obj):
        if obj.survey_assignment:
            return obj.survey_assignment.survey.title
        return None

    def create(self, validated_data):
        answers_data = validated_data.pop('response_answer', [])
        response = Response.objects.create(**validated_data)

        for answer_data in answers_data:
            Answer.objects.create(response=response, **answer_data)

        return response



##### SECTION SURVEYS SERIALIZER #####
class SectionSurveySerializer(serializers.ModelSerializer):
    section_assignments = SurveyAssignmentSerializer(many=True, read_only=True)


    class Meta:
        model = Section
        fields = ['id', 'name', 'section_assignments']



##### SURVEY ASSIGNMENT WITH RESPONSES SERIALIZER #####
class SurveyAssignmentWithResponsesSerializer(serializers.ModelSerializer):
    survey_assignment_response = ResponseSerializer(many=True, read_only=True)

    class Meta:
        model = SurveyAssignment
        fields = '__all__'


### FOR LATER USE (IMPORTANT)
# class SectionSurveySerializer(serializers.ModelSerializer):
#     section_assignments = SurveyAssignmentWithSurveySerializer(many=True, read_only=True)


#     class Meta:
#         model = Section
#         fields = ['id', 'name', 'section_assignments']

### THIS FETCHES
# {
#   "id": 1,
#   "name": "BSIT 4H-G1",
#   "section_assignments": [
#     {
#       "id": 16,
#       "created_by": "samuelalac21@gmail.com",
#       "updated_by": "samuelalac21@gmail.com",
#       "survey_details": {
#         "id": 15,
#         "created_by": "samuelalac21@gmail.com",
#         "updated_by": "samuelalac21@gmail.com",
#         "survey_questions": [
#           {
#             "id": 36,
#             "question_choices": [
#               {
#                 "id": 40,
#                 "text": "Python"
#               },
#               {
#                 "id": 41,
#                 "text": "Java"
#               },
#               {
#                 "id": 42,
#                 "text": "Go"
#               }
#             ],
#             "text": "What is preferred programming language?",
#             "question_type": "mcq",
#             "order": 1,
#             "survey": 15
#           },
#           {
#             "id": 37,
#             "question_choices": [
#               {
#                 "id": 43,
#                 "text": "Python"
#               },
#               {
#                 "id": 44,
#                 "text": "Java"
#               },
#               {
#                 "id": 45,
#                 "text": "Go"
#               }
#             ],
#             "text": "What is preferred food?",
#             "question_type": "mcq",
#             "order": 1,
#             "survey": 15
#           }
#         ],
#         "title": "Am i actually gonna die",
#         "description": "testing survey",
#         "created_at": "2025-11-08T16:10:38.948436Z",
#         "updated_at": "2025-11-08T16:10:38.948448Z"
#       },
#       "created_at": "2025-11-08T16:12:01.614647Z",
#       "updated_at": "2025-11-08T16:12:01.614662Z",
#       "due_date": null,
#       "completed": false,
#       "survey": 15,
#       "sections": [
#         1,
#         2
#       ]
#     },
#     {
#       "id": 17,
#       "created_by": "samuelalac21@gmail.com",
#       "updated_by": "samuelalac21@gmail.com",
#       "survey_details": {
#         "id": 16,
#         "created_by": "samuelalac21@gmail.com",
#         "updated_by": "samuelalac21@gmail.com",
#         "survey_questions": [
#           {
#             "id": 38,
#             "question_choices": [
#               {
#                 "id": 46,
#                 "text": "Fries"
#               },
#               {
#                 "id": 47,
#                 "text": "Fries"
#               },
#               {
#                 "id": 48,
#                 "text": "Fries"
#               }
#             ],
#             "text": "What is preferred food?",
#             "question_type": "mcq",
#             "order": 1,
#             "survey": 16
#           }
#         ],
#         "title": "Am i not gonna die",
#         "description": "testing survey",
#         "created_at": "2025-11-08T16:48:16.914519Z",
#         "updated_at": "2025-11-08T16:48:16.914545Z"
#       },
#       "created_at": "2025-11-08T16:49:00.976996Z",
#       "updated_at": "2025-11-08T16:49:00.977007Z",
#       "due_date": null,
#       "completed": false,
#       "survey": 16,
#       "sections": [
#         1,
#         2
#       ]
#     }
#   ]
# }