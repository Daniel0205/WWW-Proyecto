from rest_framework import serializers

from facturas.models import (
    User,
    Client,
    Bank
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


class BankSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bank
        fields = "__all__"
