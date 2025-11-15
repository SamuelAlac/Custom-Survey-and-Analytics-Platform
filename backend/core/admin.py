from django.contrib import admin
from .models import *

# Register your models here.
class SurveyAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'updated_at']
    search_fields = ['title']
    ordering = ['-created_at']
admin.site.register(Survey, SurveyAdmin)

class SurveyAssignmentAdmin(admin.ModelAdmin):
    list_display = ['survey', 'created_by', 'due_date', 'status', 'created_at']
    list_filter = ['status', 'due_date']
    search_fields = ['survey__title', 'sections__name', 'created_by__email']
    filter_horizontal = ['sections']

admin.site.register(SurveyAssignment, SurveyAssignmentAdmin)

class SectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']

admin.site.register(Section, SectionAdmin)

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 1

class QuestionAdmin(admin.ModelAdmin):
    list_display = ['text', 'survey', 'question_type', 'order']
    list_filter = ['question_type', 'survey']
    search_fields = ['text',]
    ordering = ['survey', 'order']
    inlines = [ChoiceInline]
admin.site.register(Question, QuestionAdmin)

class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 0
    readonly_fields = ['created_at', 'updated_at']

class ResponseAdmin(admin.ModelAdmin):
    list_display = ['id', 'respondent', 'created_at']
    search_fields = ['respondent__email']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [AnswerInline]

admin.site.register(Response, ResponseAdmin)