from rest_framework import serializers
# from .models import CustomUser instead importing our Custom User
# we can use this
from django.contrib.auth import get_user_model # returns AUTH_USER_MODEL
from django.contrib.auth.password_validation import validate_password
from dj_rest_auth.serializers import LoginSerializer

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        # model = CustomUser
        model = User
        # default user model fields
        fields = ['id', 'email', 'first_name', 'last_name', 'password1', 'password2', 'terms_and_condition']

    def validate_password1(self, value):
        validate_password(value)
        return value
    
    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({ 'password': 'Passwords do not match' })
        return attrs
    
    def save(self, request=None):
        password = self.validated_data.pop('password1')
        self.validated_data.pop('password2')
        role = getattr(User.ROLES, 'STUDENT', None)
        
        user = User(**self.validated_data)
        if role:
            user.role = role
        user.set_password(password) # hashes the password
        user.save()
        return user

# For STUDENT
class StudentRegistrationSerializer(UserRegistrationSerializer):
    def save(self, request=None):
        user = super().save(request)
        user.role = User.ROLES.STUDENT
        user.save(update_fields=['role'])
        return user
    

class UserLoginSerializer(LoginSerializer):
    username = None
    email = serializers.EmailField(required=True)
    remember_me = serializers.BooleanField(required=False, default=False)

    def validate(self, attrs):
        attrs['username'] = attrs.get('email')
        return super().validate(attrs)