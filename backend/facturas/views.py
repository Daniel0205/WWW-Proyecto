from rest_framework import permissions


from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)

from rest_framework.views import APIView 
from .models import User
from .serializers import UserSerializer

from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


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

class Login(APIView):
  def post(self,request):
    id_user = request.data.get('id_user',None)
    password = request.data.get('password',None)
    print (id_user)
    print (password)

    if id_user and password:
        user_obj = User.objects.filter(id_user__iexact= id_user ).values('id_user','name', 'password', 'type')  
        if user_obj.exists():
            user_objp= user_obj[0]
            if(check_password(password, user_objp['password'])): 
                user= User.objects.filter(id_user__iexact= id_user)

                token, created = Token.objects.get_or_create(user=user[0])
                return Response({"message": "Succesfuly logged!",  "code": 200, "data":  {'name':user_objp['name'],'token':token.key,'type':user_objp['type']}})
            else:
                message= "Incorrect password"
                
        else:
            message = "Id provided does not exist"
    else:
        message = "You have not provided data or they are not valid"
    
    return Response({"message": message , "code": 500, 'data': {}})

