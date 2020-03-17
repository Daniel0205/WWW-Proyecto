from rest_framework import permissions


from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)

from facturas.models import User
from .api.serializers import UserSerializer

class UserCreateView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = (permissions.IsAuthenticated, ) 

class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = (permissions.AllowAny, )

class UserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = (permissions.AllowAny, )


class UserUpdateView(UpdateAPIView):
    queryset =User.objects.all()
    serializer_class =UserSerializer
    #permission_classes = (permissions.IsAuthenticated, )
