from rest_framework import serializers

from django import forms
from facturas.models import User

class UserSerializer(serializers.ModelSerializer):
    password = forms.CharField(widget=forms.PasswordInput)
    
    class Meta:
        model = User
        fields = ('id_user','name','last_name','password','type','active')
    