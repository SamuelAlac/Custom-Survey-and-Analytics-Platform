from rest_framework.permissions import BasePermission

class HasRole(BasePermission):
    required_role = None 

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "role", None) == self.required_role
        )

class IsTeacher(HasRole):
    required_role = 'TEACHER'
    
class IsStudent(HasRole):
    required_role = 'STUDENT'

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