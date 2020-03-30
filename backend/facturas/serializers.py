from rest_framework import serializers

from facturas.models import (
    User,
    Client,
    Apartment,
    Substation,
    Transformer,
    ElectricityMeter,
    Bank,
    Bill,
    Payment,
)

from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}
            
        
    def create(self, validated_data):
        
        user = User.objects.create(
            id_user=validated_data['id_user'],
            name=validated_data['name'],
            last_name=validated_data['last_name'],            
            type=validated_data['type'],
            active=validated_data['active'],
            password=make_password(validated_data['password']),
            is_admin=validated_data['is_admin'],
            is_staff=validated_data['is_staff'],
            is_superuser=validated_data['is_superuser']
        )
        
        return user 
    

class ClientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Client
        fields = "__all__"

class ApartmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Apartment
        fields = "__all__"

class SubstationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Substation
        fields = "__all__"

class TransformerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Transformer
        fields = "__all__"

class ElectricityMeterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ElectricityMeter
        fields = "__all__"

class BankSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bank
        fields = "__all__"

class BillSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bill
        fields = "__all__"

class PaymentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Payment
        fields = "__all__"
    