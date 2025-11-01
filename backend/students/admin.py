from django.contrib import admin
from .models import Student, StudentProfile

# Register your models here.
class StudentAdmin(admin.ModelAdmin):
    list_display: ['email', 'first_name', 'last_name', 'section', 'role']
admin.site.register(Student, StudentAdmin)

class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ['student', 'section', 'created_at', 'updated_at']
    search_fields = ['student__email', 'student__first_name', 'student__last_name']
    list_filter = ['section']
admin.site.register(StudentProfile, StudentProfileAdmin)