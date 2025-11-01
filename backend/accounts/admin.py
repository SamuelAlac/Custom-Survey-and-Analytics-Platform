from django.contrib import admin
from .models import User
from django.core.mail import send_mail
from django.utils.crypto import get_random_string

@admin.action(description='Send email to selected users')
def send_email_to_user(modeladmin, request, queryset):
    for user in queryset:
        send_mail(
            subject='Hello',
            message='This is a test email.',
            from_email='samuelalac21@gmail.com',
            recipient_list=[user.email]
        )

@admin.action(description='Send random password to selected users')
def send_random_password(modeladmin, request, queryset):
    for user in queryset:
        new_password = get_random_string(length=10)
        user.set_password(new_password)
        user.save()
        send_mail(
            subject='Your account password',
            message=f'Hello {user.username},\n\n'
            f'Your new password is {new_password}\n'
            f'Please log in and change it immediately.\n\n'
            f'- Admin',
            from_email='samuelalac21@gmail.com',
            recipient_list=[user.email],
            fail_silently=False,
        )

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'is_active', 'is_staff', 'role']
    actions = [send_email_to_user, send_random_password]

# Register your models here.
admin.site.register(User, UserAdmin)