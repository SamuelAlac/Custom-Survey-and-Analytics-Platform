from django.urls import path
from .views import SectionsView, SectionDetailView, SurveysView, SurveyDetailView, QuestionsView, QuestionDetailView

urlpatterns = [
    path('sections/', SectionsView.as_view(), name='sections'),
    path('sections/<int:pk>/', SectionDetailView.as_view(), name='section-detail'),
    path('surveys/', SurveysView.as_view(), name='questions'),
    path('surveys/<int:pk>/', SurveyDetailView.as_view(), name='survey-detail'),
    path('questions/', QuestionsView.as_view(), name='questions'),
    path('questions/<int:pk>/', QuestionDetailView.as_view(), name='question-detail'),
]