from django.urls import path
from .views import *

urlpatterns = [
    path('sections/', SectionsView.as_view(), name='sections'),
    path('sections/<int:pk>/', SectionDetailView.as_view(), name='section-detail'),
    path('surveys/', SurveysView.as_view(), name='questions'),
    path('surveys/<int:pk>/', SurveyDetailView.as_view(), name='survey-detail'),
    path('choices/<int:pk>/', ChoiceDetailView.as_view(), name='choice-detail'),
    path('questions/', QuestionsView.as_view(), name='questions'),
    path('questions/<int:pk>/', QuestionDetailView.as_view(), name='question-detail'),
    path('survey-assignments/', SurveyAssignmentsView.as_view(), name='survey-assignments'),
    path('survey-assignments/<int:pk>/', SurveyAssignmentDetailView.as_view(), name='survey-assignment-detail'),
    path('survey-assignment-surveys/', SurveyAssignmentsWithSurveyView.as_view(), name='survey-assignment-survey'),
    path('survey-assignment-surveys/<int:pk>/', SurveyAssignmentWithSurveyDetailView.as_view(), name='survey-assignment-survey-details'),
    path('survey-assignment-responses/<int:pk>/', SurveyAssignmentWithResponsesDetailView.as_view(), name='survey-assignment-responses-detail'),
    path('survey-assignment-qa/<int:pk>/', SurveyAssignmentWithQuestionAndResponseeDetailView.as_view(), name='survey-assignment-qa-detail'),
    path('survey-responses/', ResponsesView.as_view(), name='survey-responses'),
    path('survey-responses/<int:pk>/', ResponseDetailView.as_view(), name='survey-response-detail'),
    path('survey-response-answers/', ResponsesWithAnswerView.as_view(), name='survey-response-answers'),
    path('survey-response-answers/<int:pk>/', ResponseWithAnswerDetailView.as_view(), name='survey-response-answer-detail'),
    path('section-survey/<int:pk>/', SectionSurveyDetailView.as_view(), name='section-survey-details'),
]