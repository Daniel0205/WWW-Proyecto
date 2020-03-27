from django import forms

from facturas.models import User

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('id_user','name','last_name','password','type','active')
        field_order = ('id_user','name','last_name','password','type','active')