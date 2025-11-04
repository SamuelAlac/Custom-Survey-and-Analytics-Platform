from django.urls import path
from .views import SectionsView, SectionDetailView, SurveysView, SurveyDetailView

urlpatterns = [
    path('sections/', SectionsView.as_view(), name='sections'),
    path('sections/<int:pk>/', SectionDetailView.as_view(), name='section-detail'),
    path('surveys/', SurveysView.as_view(), name='sections'),
    path('surveys/<int:pk>/', SurveyDetailView.as_view(), name='section-detail'),
]