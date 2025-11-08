from django.db import models
from django.conf import settings
from accounts.models import User
from django.contrib.auth.models import BaseUserManager
from django.utils.crypto import get_random_string

# Create your models here.
class StudentManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.ROLES.STUDENT)

class Student(User):
    students = StudentManager()

    class Meta:
        proxy = True
        # for Student.students.all()
        # for Student.objects.all()

    def save(self, *args, **kwargs):
        self.role = User.ROLES.STUDENT
        if not self.username and self.first_name and self.last_name:
            base_username = f'{self.first_name}{self.last_name}'
            username = base_username

            while User.objects.filter(username=username).exists():
                username = f'{base_username}_{get_random_string(4)}'
            
            self.username = username
        super().save(*args, **kwargs)
    
    def student_section(self, stud_section):
        self.section = stud_section
        self.save()

    @property
    def section_name(self):
        return self.section.name if self.section else "No Section Assigned"
    
class StudentProfile(models.Model):
    student = models.OneToOneField(User, on_delete=models.CASCADE, related_name='studentprofile')
    section = models.ForeignKey('core.Section', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)