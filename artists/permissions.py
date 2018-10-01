from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            if request.method in permissions.SAFE_METHODS:
                return True
            return request.data.get('creator')[0]==str(request.user.id)
        except Exception:
            return False