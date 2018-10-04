from rest_framework import permissions
import numbers

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            if request.method in permissions.SAFE_METHODS:
                return True
            elif type(request.data.get('creator')) is list:
                return request.data.get('creator')[0]==str(request.user.id)
            elif type(request.data.get('creator'))==str:
                return request.data.get('creator')==str(request.user.id)
            else:
                return False
        except Exception:
            return False

class AllowCreate(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            if request.method in permissions.SAFE_METHODS or 'POST':
                return True
            elif type(request.data.get('creator')) is list:
                return request.data.get('creator')[0]==str(request.user.id)
            elif type(request.data.get('creator'))==str:
                return request.data.get('creator')==str(request.user.id)
            else:
                return False
        except Exception:
            return False
        