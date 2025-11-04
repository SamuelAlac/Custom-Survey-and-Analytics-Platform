from rest_framework.permissions import BasePermission

class HasRole(BasePermission):
    allowed_roles = []

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "role", None) in self.allowed_roles
        )

class IsTeacher(HasRole):
    allowed_roles = ['TEACHER']
    
class IsStudent(HasRole):
    allowed_roles = ["STUDENT"]

class IsAdmin(HasRole):
    allowed_roles = ['ADMIN']

class IsTeacherOrAdmin(HasRole):
    allowed_roles = ['TEACHER', 'ADMIN']

# sample

#permission_classes = [IsTeacher | IsAdmin]

# teachers/views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from accounts.permissions import IsTeacher

# class TeacherDashboardView(APIView):
#     permission_classes = [IsTeacher]

#     def get(self, request):
#         return Response({"message": f"Welcome, {request.user.first_name}!"})