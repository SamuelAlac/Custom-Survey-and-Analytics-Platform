from django.shortcuts import render
from rest_framework.response import Response
from dj_rest_auth.views import LoginView
from django.contrib.auth import login, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta

# Create your views here.
class   CustomLoginView(LoginView):
    def post(self, request):
        user = authenticate(email=request.data['email'], password=request.data['password'])
        if user:
            remember_me = request.data.get('remember_me', False)
            refresh = RefreshToken.for_user(user)

            # Adjust token lifetime
            if remember_me:
                refresh.set_exp(lifetime=timedelta(days=30))
            else:
                refresh.set_exp(lifetime=timedelta(days=1))

            access_token = refresh.access_token

            response = Response({"detail": "Login successful"})

            # Store tokens as cookies
            response.set_cookie(
                "access", str(access_token),
                httponly=True,
                secure=not request.get_host().startswith("localhost"),
                samesite="Lax",
                max_age=60 * 60 * 24 * (30 if remember_me else 1)
            )
            response.set_cookie(
                "refresh", str(refresh),
                httponly=True,
                secure=not request.get_host().startswith("localhost"),
                samesite="Lax",
                max_age=60 * 60 * 24 * (30 if remember_me else 1)
            )

            return response

        return Response({"detail": "Invalid credentials"}, status=400)
    