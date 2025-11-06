from django.db import models
from django.conf import settings

# Create your models here.
class Survey(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='survey_created', on_delete=models.SET_NULL, null=True, blank=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='survey_updated', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Section(models.Model):
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='section_created', on_delete=models.SET_NULL, null=True, blank=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='section_updated', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class SurveyAssignment(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    sections = models.ManyToManyField(Section, related_name='section_assignments')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='survey_assignment_created', on_delete=models.SET_NULL, null=True, blank=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='survey_assignment_updated', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)

    # def is_overdue(self):
    #     if self.due_date and not self.completed:
    #         return timezone.now > self.due_date
    #     return False

    def __str__(self):
        section_names = ', '.join(self.sections.values_list('name', flat=True))
        return f"'{self.survey.title} assigned to: {section_names}'"
    
class Question(models.Model):
    class Types(models.TextChoices):
        TEXT = 'text', 'Short Answer'
        MCQ = 'mcq', 'Multiple Choice'
        LIKERT = 'likert', 'Likert Scale'
        
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='survey_questions')
    text = models.TextField()
    question_type = models.CharField(max_length=20, choices=Types.choices)
    order = models.PositiveIntegerField(default=0)

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question_choices')
    text = models.CharField(max_length=255)