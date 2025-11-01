from django.db import models
from django.conf import settings
from accounts.models import User
from django.contrib.auth.models import BaseUserManager
from django.utils.crypto import get_random_string


# Create your models here.
class TeacherManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.ROLES.TEACHER)

class Teacher(User):
    teachers = TeacherManager()

    class Meta:
        proxy = True
        # for Teacher.teachers.all()
        # for Teacher.objects.all()

    def save(self, *args, **kwargs):
        self.role = User.ROLES.TEACHER
        if not self.username and self.first_name and self.last_name:
            base_username = f'{self.first_name}{self.last_name}'
            username = base_username

            while User.objects.filter(username=username).exists():
                username = f'{base_username}_{get_random_string(4)}'
            
            self.username = username
        super().save(*args, **kwargs)

class TeacherProfile(models.Model):
    teacher = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    