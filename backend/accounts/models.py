from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.crypto import get_random_string

# Create your models here.
class User(AbstractUser):
    class ROLES(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        STUDENT = 'STUDENT', 'Student'
        TEACHER = 'TEACHER', 'Teacher'

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLES.choices)
    terms_and_condition = models.BooleanField(default=False)

    # comment lng to pag gagawa superuser nababalew
    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        if not self.pk and not self.role:
            self.role = User.ROLES.ADMIN
        
        if not self.username and self.first_name and self.last_name:
            base_username = f'{self.first_name}{self.last_name}'
            username = base_username

            while User.objects.filter(username=username).exists():
                username = f'{base_username}_{get_random_string(4)}'
            
            self.username = username
        super().save(*args, **kwargs)