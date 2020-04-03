from rest_framework import permissions


from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)

from .models import ( 
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

from rest_framework.views import APIView 
from .serializers import (
    UserSerializer,
    ClientSerializer,
    ApartmentSerializer,
    SubstationSerializer,
    TransformerSerializer,
    ElectricityMeterSerializer,
    BankSerializer,
    BillSerializer,
    PaymentSerializer
    )

from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password

#########################LOGIN########################
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
                return Response({"message": "Succesfuly logged!",  "code": 200, "data":  { "id_user":id_user,'name':user_objp['name'],'token':token.key,'type':user_objp['type']}})
            else:
                message= "Incorrect password"
                
        else:
            message = "Id provided does not exist"
    else:
        message = "You have not provided data or they are not valid"
    
    return Response({"message": message , "code": 500, 'data': {}})



#####################USER#####################
class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserUpdateView(UpdateAPIView):
    queryset =User.objects.all()
    serializer_class =UserSerializer

###############################################

#####################CLIENT#####################
class  ClientCreateView(CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ClientListView(ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ClientUpdateView(UpdateAPIView):
    queryset =Client.objects.all()
    serializer_class = ClientSerializer

###############################################

#####################Apartment#####################
class  ApartmentCreateView(CreateAPIView):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer


class ApartmentListView(ListAPIView):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer


class ApartmentUpdateView(UpdateAPIView):
    queryset =Apartment.objects.all()
    serializer_class = ApartmentSerializer

###############################################

#####################Substation#####################
class  SubstationCreateView(CreateAPIView):
    queryset = Substation.objects.all()
    serializer_class = SubstationSerializer


class SubstationListView(ListAPIView):
    queryset = Substation.objects.all()
    serializer_class = SubstationSerializer


class SubstationUpdateView(UpdateAPIView):
    queryset =Substation.objects.all()
    serializer_class = SubstationSerializer

###############################################

#####################Transformer#####################
class  TransformerCreateView(CreateAPIView):
    queryset = Transformer.objects.all()
    serializer_class = TransformerSerializer


class TransformerListView(ListAPIView):
    queryset = Transformer.objects.all()
    serializer_class = TransformerSerializer


class TransformerUpdateView(UpdateAPIView):
    queryset =Transformer.objects.all()
    serializer_class = TransformerSerializer

###############################################

#####################ElectricityMeter#####################
class  ElectricityMeterCreateView(CreateAPIView):
    queryset = ElectricityMeter.objects.all()
    serializer_class = ElectricityMeterSerializer


class ElectricityMeterListView(ListAPIView):
    queryset = ElectricityMeter.objects.all()
    serializer_class = ElectricityMeterSerializer


class ElectricityMeterUpdateView(UpdateAPIView):
    queryset =ElectricityMeter.objects.all()
    serializer_class = ElectricityMeterSerializer

###############################################

#####################Bank#####################
class  BankCreateView(CreateAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class BankListView(ListAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class BankUpdateView(UpdateAPIView):
    queryset =Bank.objects.all()
    serializer_class = BankSerializer

###############################################

#####################Bill#####################
class  BillCreateView(CreateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer


class BillListView(ListAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer


class BillUpdateView(UpdateAPIView):
    queryset =Bill.objects.all()
    serializer_class = BillSerializer

###############################################

#####################Payment#####################
class  PaymentCreateView(CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class PaymentListView(ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class PaymentUpdateView(UpdateAPIView):
    queryset =Payment.objects.all()
    serializer_class = PaymentSerializer

###############################################
