from django.urls import path
from .views import RegisterView, VerifyEmailView, LogoutView, VerifyEmailCodeView, ResendVerificationCodeView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-code/', VerifyEmailCodeView.as_view(), name='verify-code'),
    path('resend-code/', ResendVerificationCodeView.as_view(), name='resend-code'),
    # path('verify-email/<str:token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('logout/', LogoutView.as_view(), name='logout')
]