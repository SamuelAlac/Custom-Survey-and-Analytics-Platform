from rest_framework import serializers
from django.contrib.auth import get_user_model # returns AUTH_USER_MODEL
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.mail import send_mail
from django.urls import reverse
import uuid
from core.models import *
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
from .models import User
from core.serializers import *

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
        required=True,
        allow_null=False
    )

    section_name = serializers.SerializerMethodField()

    class Meta:
        # model = CustomUser
        model = User
        # default user model fields
        fields = ['id', 'email', 'first_name', 'last_name', 'password1', 'password2', 'section', 'section_name', 'terms_and_condition',]

    def get_section_name(self, obj):
        if obj.section:
            return obj.section.name
        return None

    def validate_password1(self, value):
        validate_password(value)
        return value
    
    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({ 'password': 'Passwords do not match' })
    
        if not attrs.get('terms_and_condition'):
            raise serializers.ValidationError({'terms_and_condition': 'You must accept the terms and conditions to register.'})
        
        if not attrs.get('section'):
            raise serializers.ValidationError({
                'section': 'Section is required and must exist.'
            })

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
        if section_instance:
            user.section = section_instance
        user.set_password(password)
        user.is_active = False
        # FOR VERTIFICATION THRU EMAIL BEFORE
        # user.verification_token = str(uuid.uuid4())
        user.save()

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

class AccountSerializer(serializers.ModelSerializer):
    section_name = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'section', 'section_name']

    def get_section_name(self, obj):
        if obj.section:
            return obj.section.name
        return None
    
class UserSurveySerializer(serializers.ModelSerializer):
    section = SectionSurveySerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'section']

class UserResponseSerializer(serializers.ModelSerializer):
    survey_respondent = ResponseSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'section', 'survey_respondent']

class SectionStudentSerializer(serializers.ModelSerializer):
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    updated_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    user = AccountSerializer(source='students', many=True, read_only=True)

    class Meta:
        model = Section
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']