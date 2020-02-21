from rest_framework import serializers

from facturas.models import Client

class FacturaSerializer (serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id','name','last_name','email','type','shipping_way')