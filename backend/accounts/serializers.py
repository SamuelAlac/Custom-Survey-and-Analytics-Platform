from rest_framework import serializers
from django.contrib.auth import get_user_model # returns AUTH_USER_MODEL
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.mail import send_mail
from django.urls import reverse
import uuid
from core.models import Section
from students.models import Student, StudentProfile
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        remember_me = self.context['request'].data.get('remember_me', False)
        refresh = RefreshToken.for_user(self.user)
        refresh['username'] = self.user.username
        refresh['role'] = self.user.role

        if remember_me:
            refresh.set_exp(lifetime=timedelta(days=30))

        data['access'] = str(refresh.access_token)
        data['refresh'] = str(refresh)
        return data

User = get_user_model()
class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    email = serializers.EmailField()
    section = serializers.SlugRelatedField(
        queryset=Section.objects.all(),
        slug_field='name',
        required=False,
        allow_null=True
    )

    section_name = serializers.SerializerMethodField()

    class Meta:
        # model = CustomUser
        model = User
        # default user model fields
        fields = ['id', 'email', 'first_name', 'last_name', 'password1', 'password2', 'section', 'section_name', 'terms_and_condition',]

    def get_section_name(self, obj):
        try:
            return obj.studentprofile.section.name
        except StudentProfile.DoesNotExist:
            return None
        except AttributeError:
            return None

    def validate_password1(self, value):
        validate_password(value)
        return value
    
    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({ 'password': 'Passwords do not match' })
    
        if not attrs.get('terms_and_condition'):
            raise serializers.ValidationError({'terms_and_condition': 'You must accept the terms and conditions to register.'})
        
        return attrs

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password1')
        validated_data.pop('password2')
        section_instance = validated_data.pop('section', None)
        role = getattr(User.ROLES, 'STUDENT', None)
        user = User(**validated_data)
        
        if role:
            user.role = role
        user.set_password((password)) # hashes the password
        user.is_active = False
        # FOR VERTIFICATION THRU EMAIL BEFORE
        # user.verification_token = str(uuid.uuid4())
        user.save()

        profile, created = StudentProfile.objects.get_or_create(
            student=user,
            defaults={'section': section_instance}
        )
        if not created and section_instance:
            profile.section = section_instance
            profile.save(update_fields=['section'])

        user.section_name = profile.section.name if profile.section else None

        # FOR VERTIFICATION THRU EMAIL BEFORE
        # request = self.context.get('request')
        # if request:
        #     verification_url = request.build_absolute_uri(
        #         reverse('verify-email', kwargs={'token': user.verification_token})
        #     )
        #     subject = 'Verify Your Email Address'
        #     message = f'Click the link to verify your email: {verification_url}'
        #     send_mail(
        #         subject,
        #         message,
        #         'samuelalac21@gmail',
        #         [user.email],
        #         fail_silently=False,
        #     )

        code = user.generate_verification_code()
        subject = "Verify Your Email Address"
        message = f"Your verification code is: {code}. It will expire in 10 minutes."
        send_mail(
            subject,
            message,
            'samuelalac21@gmail.com',
            [user.email],
            fail_silently=False,
        )

        return user
        
        return user

class StudentRegistrationSerializer(UserRegistrationSerializer):
    def save(self, request=None):
        user = super().save(request)
        user.role = User.ROLES.STUDENT
        user.save(update_fields=['role'])
        return user

    # def save(self, request=None):
    #     password = self.validated_data.pop('password1')
    #     self.validated_data.pop('password2')
    #     role = getattr(User.ROLES, 'STUDENT', None)
        
    #     user = User(**self.validated_data)
    #     if role:
    #         user.role = role
    #     user.set_password(password) # hashes the password
    #     user.save()
    #     return user












# class UserRegistrationSerializer(serializers.ModelSerializer):
#     password1 = serializers.CharField(write_only=True)
#     password2 = serializers.CharField(write_only=True)

#     class Meta:
#         # model = CustomUser
#         model = User
#         # default user model fields
#         fields = ['id', 'email', 'first_name', 'last_name', 'password1', 'password2', 'terms_and_condition',]

#     def validate_password1(self, value):
#         validate_password(value)
#         return value
    
#     def validate(self, attrs):
#         if attrs['password1'] != attrs['password2']:
#             raise serializers.ValidationError({ 'password': 'Passwords do not match' })
#         return attrs
    
#     def save(self, request=None):
#         password = self.validated_data.pop('password1')
#         self.validated_data.pop('password2')
#         role = getattr(User.ROLES, 'STUDENT', None)
        
#         user = User(**self.validated_data)
#         if role:
#             user.role = role
#         user.set_password(password) # hashes the password
#         user.save()
#         return user

# # For STUDENT
class StudentRegistrationSerializer(UserRegistrationSerializer):
    def save(self, request=None):
        user = super().save(request)
        user.role = User.ROLES.STUDENT
        user.save(update_fields=['role'])
        return user
    

# class UserLoginSerializer(LoginSerializer):
#     username = None
#     email = serializers.EmailField(required=True)
#     remember_me = serializers.BooleanField(required=False, default=False)

#     class Meta:
#         model = User
#         fields = ["id", "username", "email", "first_name", "last_name", "role"]

#     def validate(self, attrs):
#         attrs['username'] = attrs.get('email')
#         return super().validate(attrs)