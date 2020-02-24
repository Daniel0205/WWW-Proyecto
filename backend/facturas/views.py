
from rest_framework.generics import ListAPIView,RetrieveAPIView

from facturas.models import User
from .api.serializers import UserSerializer


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
