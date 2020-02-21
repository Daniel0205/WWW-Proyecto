
from rest_framework.generics import ListAPIView,RetrieveAPIView

from facturas.models import Client
from .api.serializers import FacturaSerializer


class FacturaListView(ListAPIView):
    queryset = Client.objects.all()
    serializer_class = FacturaSerializer

class FacturaDetailView(RetrieveAPIView):
    queryset = Client.objects.all()
    serializer_class = FacturaSerializer
