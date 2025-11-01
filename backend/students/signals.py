from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import User
from students.models import Student, StudentProfile

@receiver(post_save, sender=User)
def create_student_profile(sender, instance, created, **kwargs):
    if created and instance.role == User.ROLES.STUDENT:
        StudentProfile.objects.create(student=instance)
