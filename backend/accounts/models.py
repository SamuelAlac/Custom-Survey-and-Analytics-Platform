from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.crypto import get_random_string
import random
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    class ROLES(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        STUDENT = 'STUDENT', 'Student'
        TEACHER = 'TEACHER', 'Teacher'

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLES.choices)
    #verification_token = models.CharField(max_length=36, blank=True, null=True)
    section = models.ForeignKey('core.Section', on_delete=models.SET_NULL, blank=True, null=True)
    verification_code = models.CharField(max_length=6, blank=True, null=True)
    code_expiration = models.DateTimeField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    terms_and_condition = models.BooleanField(default=False)

    # comment lng to pag gagawa superuser nababalew kase
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def generate_verification_code(self):
        code = str(random.randint(100000, 999999))
        self.verification_code = code
        self.code_expiration = timezone.now() + timezone.timedelta(minutes=10)
        self.save()
        return code

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