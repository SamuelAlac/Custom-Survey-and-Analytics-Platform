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
    path('survey-assignments/', SurveyAssignmentView.as_view(), name='survey-assignments'),
    path('survey-assignments/<int:pk>/', SurveyAssignmentDetailView.as_view(), name='survey-assignment-details'),
    path('survey-response/', ResponsesView.as_view(), name='survey-response'),
]