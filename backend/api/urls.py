from django.urls import path, include


urlpatterns = [
    path('auth/', include('accounts.urls')),
    path('core/', include('core.urls')),
    # path('students/', include('students.urls'))
]