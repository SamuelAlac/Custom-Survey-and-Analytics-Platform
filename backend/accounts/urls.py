from django.urls import path
from .views import RegisterView, VerifyEmailView, LogoutView, VerifyEmailCodeView, ResendVerificationCodeView
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import MyTokenObtainPairView, AccountView

urlpatterns = [
    path('my-account/', AccountView.as_view(), name='my-account'),
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-code/', VerifyEmailCodeView.as_view(), name='verify-code'),
    path('resend-code/', ResendVerificationCodeView.as_view(), name='resend-code'),
    # path('verify-email/<str:token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout')
]