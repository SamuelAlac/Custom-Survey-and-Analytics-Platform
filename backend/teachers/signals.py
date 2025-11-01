from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import User
from teachers.models import Teacher, TeacherProfile

@receiver(post_save, sender=User)
def create_teacher_profile(sender, instance, created, **kwarg):
    if created and instance.role == User.ROLES.TEACHER:
        TeacherProfile.objects.create(teacher=instance)