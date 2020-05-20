from rest_framework import permissions
from django.db.models.functions import ExtractMonth,ExtractYear
from django.db.models import Count,Sum,F,Case,When
from datetime import datetime, timedelta, date
from random import randrange

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


class  UserTypeListView(APIView):
    def get(self,request):
        queryset1 = User.objects.filter(active=True).values("type").annotate(c=Count("type")).values("type","c")
    
        return Response(queryset1)

class  UserActiveListView(APIView):
    def get(self,request):
        queryset1 = list(User.objects.values("active").annotate(c=Count("active")).values("type","active","c"))
        queryset2 = User.objects.filter(active=True).values("active").annotate(c=Count("active")).values("c")
        queryset3 = User.objects.filter(active=False).values("active").annotate(c=Count("active")).values("c")

        queryset1.extend([{"type":"totalActive","c":queryset2[0]["c"]}])
        queryset1.extend([{"type":"totalInactive","c":queryset3[0]["c"]}])

        return Response(queryset1)

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

class ApartmentsClass(APIView):
    def get(self, request, *args, **kwargs):
        id = kwargs.get('id', 'Default Value if not there')
        apartments = Apartment.objects.filter(id_user_client=id).values()
        serializer_class = UserSerializer
        return Response(apartments)

class  ApartmentsActiveList(APIView):
    def get(self,request):
        queryset1 = Apartment.objects.filter(active=True)
        queryset2 = Apartment.objects.all()

        return Response([{"state":"Active","c":len(queryset1)},{"state":"inactive","c":len(queryset2)-len(queryset1)}])

class  ApartmentsPayList(APIView):
    def get(self,request):
        queryset1 = Bill.objects.filter(payment_status=False).values("id_electricitymeter")
        queryset2 = list(ElectricityMeter.objects.exclude(id_electricitymeter__in=queryset1).values("id_electricitymeter"))


        return Response([{"state":"up_to_date","c":len(queryset2)},{"state":"delayed","c":len(queryset1)}])

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


class SubstationActiveView(APIView):
    def get(self,request):
        queryset =Substation.objects.values("active").annotate(c=Count("active")).values("active","c")

        return Response(queryset)

class  SubActiveTransListView(APIView):
    def get(self,request):
        queryset = Substation.objects.filter(active=True).values("active").annotate(c=Count("active")).values("active","c")
        queryset2 = Substation.objects.values("active").annotate(c=Count("active")).values("c")


        return Response([{"state":"Active","c":queryset[0]["c"]},{"state":"Inactive","c":queryset2[0]["c"]-queryset[0]["c"]},{"state":"Total","c":queryset2[0]["c"]}])


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

class TransformerActiveView(APIView):
    def get(self,request):
        queryset =Transformer.objects.values("active").annotate(c=Count("active")).values("active","c")
        serializer_class = TransformerSerializer

        return Response(queryset)

class TransformerSubView(APIView):
    def get(self,request):
        queryset = Transformer.objects.values("id_substation").annotate(c=Count("id_substation")).values("id_substation","c")
        serializer_class = TransformerSerializer

        return Response(queryset)

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

class  BankNumberList(APIView):
    def get(self,request):
        queryset = list(Payment.objects.filter(payment_method="B").annotate(name_bank=F("id_bank__name_bank")).values("name_bank").annotate(c=Count("quantity"),s=Sum("quantity")).values("name_bank","c","s"))
        bankPaids = Payment.objects.filter(payment_method="B").values("id_bank").distinct()

        otherBanks = list(Bank.objects.exclude(id_bank__in=bankPaids).values("name_bank"))
        
        
        for x in otherBanks:
            print(x)
            queryset.extend([{"name_bank":x["name_bank"],"c":0,"su":0}])


        return Response(queryset)

###############################################

#####################Bill#####################
class  BillCreateView(CreateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

class  BillListViewMonth(APIView):
    def get(self,request):

        today = datetime.now()

        queryset = Bill.objects.filter(payment_status=True,expedition_date__year=today.year).annotate(month=ExtractMonth('expedition_date')).values('month').annotate(c=Sum('quantity')).values('month', 'c') 
        

        return Response(queryset)


class  BillPayListView(APIView):
    def get(self,request):

        today = datetime.now()

        queryset = list(Bill.objects.filter(payment_status=False,expedition_date__year=today.year).annotate(month=ExtractMonth('expedition_date')).values('month').annotate(c=Sum('quantity')).values('month', 'c') )
        queryset1= list(Bill.objects.filter(payment_status=False,expedition_date__year=today.year).values('payment_status').annotate(c=Sum('quantity')).values('payment_status', 'c') )
        
        queryset.extend([{"month":"total","c":queryset1[0]["c"]}])

        return Response(queryset)

class BillListView(ListAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer


class BillUpdateView(UpdateAPIView):
    queryset =Bill.objects.all()
    serializer_class = BillSerializer

class BillSingle(APIView):
    def get(self, request, *args, **kwargs):
        id = kwargs.get('id', 'Default Value if not there')
        bill = Bill.objects.filter(id_bill=id).values()
        serializer_class = BillSerializer
        return Response(bill)

###############################################

#####################Payment#####################
class  PaymentCreateView(CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class  PaymentTypeList(APIView):
    def get(self,request):
        queryset = Payment.objects.values('payment_method').annotate(c=Count('payment_method')).values('payment_method', 'c')
        serializer_class = PaymentSerializer 
        
        return Response(queryset)

class PaymentListView(ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class PaymentUpdateView(UpdateAPIView):
    queryset =Payment.objects.all()
    serializer_class = PaymentSerializer

class PaymentIdView(APIView):
    def get(self, request, *args, **kwargs):
        id = kwargs.get('id', 'Default Value if not there')
        queryset = Payment.objects.filter(id_bill__id_electricitymeter__apartment__id_user_client=id).values("payment_method","quantity","payment_date","id_bill","id_payment")
        #Client.objects.filter(id=1234).values("apartment__id_electricitymeter__bill__payment__quantity")
        serializer_class = PaymentSerializer

        return Response(queryset)
    

###############################################

#####################Simulation#####################

class  SimulateBillPayment(APIView):
    def post(self,request):
        date = Apartment.objects.filter(active=True).order_by('-id_electricitymeter__actual_measuring_date').values("id_electricitymeter__actual_measuring_date")[0]
        date = date["id_electricitymeter__actual_measuring_date"]

        if((date.month+2)>12):
            month = datetime(date.year, 1, date.day)
            month1 = datetime(date.year, 2, date.day)
        else:            
            month = datetime(date.year, date.month+1, date.day)
            
            month1 = datetime(date.year, date.month+2, date.day)

        queryId= Apartment.objects.filter(active=True).values("num_contract","id_electricitymeter","id_electricitymeter__previous_measuring","id_electricitymeter__actual_measuring")

        for x in queryId:
            query= ElectricityMeter.objects.filter(
                apartment__active=True,
                apartment__num_contract=x["num_contract"]
            ).update(
                previous_measuring=F("actual_measuring"),
                previous_measuring_date=F("actual_measuring_date"),
                actual_measuring=F("actual_measuring")+randrange(60),
                actual_measuring_date=month)
            
            Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=x["id_electricitymeter"]),
                quantity = x["id_electricitymeter__actual_measuring"]*1000-x["id_electricitymeter__previous_measuring"]*1000 ,
                expedition_date=month,
                due_date=month1 ,
                payment_status=False).save()               

        
        bills = Bill.objects.filter(payment_status=False).order_by('due_date').values("id_bill","quantity","due_date")

        banks = Bank.objects.filter(active=True).values("id_bank")

        for x in range(randrange(len(bills))):

            id = banks[randrange(len(banks))]["id_bank"]

            Payment(payment_date=bills[x]["due_date"],
                    quantity=bills[x]["quantity"] ,
                    payment_method="B",
                    id_bill=Bill.objects.get(id_bill=bills[x]["id_bill"]),
                    id_bank=Bank.objects.get(id_bank=id)).save()

            Bill.objects.filter(id_bill=bills[x]["id_bill"]).update(payment_status=True) 


        return Response({"state":True})


#################Print Bill#######################

class  BillAllInfoView(APIView):
    def post(self,request):     

        id_bill = request.data["return_bill"]  
  
        fields = [
        # Client
        "id_user_client",
        "id_user_client__name", 
        "id_user_client__last_name", 
        "id_user_client__email", 
        # Apartment
        "num_contract",
        "address", 
        "stratum", 
        # ElectricityMeter
        "id_electricitymeter",                 
        "id_electricitymeter__previous_measuring", 
        "id_electricitymeter__previous_measuring_date", 
        "id_electricitymeter__actual_measuring", 
        "id_electricitymeter__actual_measuring_date",
        # Bill
        "id_electricitymeter__bill__id_bill",
        "id_electricitymeter__bill__expedition_date",
        "id_electricitymeter__bill__due_date",
        "id_electricitymeter__bill__payment_status",
        "id_electricitymeter__bill__quantity",
        ]
        
        latest_expedition_date = Bill.objects.values("expedition_date").order_by("-expedition_date")[0]["expedition_date"]
        
        bills_list = list(Bill.objects.values("id_electricitymeter", "quantity"))    
        latest_6_months_consumption = {}
        for i in bills_list:
            latest_6_months_consumption[str(i['id_electricitymeter'])] = []
        for i in bills_list:
            latest_6_months_consumption[str(i['id_electricitymeter'])].append(i["quantity"]/1000)
        
        
        if(id_bill=="All"):
            queryset = list(Apartment.objects
            .filter( id_electricitymeter__bill__expedition_date=latest_expedition_date )
            .values(*fields))
        else:
            queryset = list(Apartment.objects
            .filter(id_user_client=id_bill)
            .filter( id_electricitymeter__bill__expedition_date=latest_expedition_date )
            .values(*fields))

        # adding calculated information for the bill
        for i in queryset:           
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            due_date = i["id_electricitymeter__bill__due_date"]          
            # Dias de mora
            i["due_days"] = ( date.today() - due_date ).days 
            # Intereses por mora, max 30%
            i["interest"] = (i["due_days"]/100)*i["id_electricitymeter__bill__quantity"] if (i["due_days"]<=30 and i["due_days"]>0) else 0
            # Dias facturados
            i["days_billed"] = ( i["id_electricitymeter__actual_measuring_date"]-i["id_electricitymeter__previous_measuring_date"] ).days
            # Consumo mensual (lectura)
            i["month_measuring"] = i["id_electricitymeter__actual_measuring"] - i["id_electricitymeter__previous_measuring"]
            # Promedio de consumo diario
            i["average_daily_measuring"] = round(i["month_measuring"] / 30, 2)
            # Periodo de facturación
            i["month_billed"] = months[ due_date.month - 1 ]
            #dias_mora > 60 --> suspendido
            i["discontinued"] = True if(i["due_days"]>60) else False
            # suspendido True --> reconexion = 34000
            i["reconnect_value"] =  34000 if(i["discontinued"]) else 0
            # consumo de los ultimos 6 meses
            i["latest_6_months_consumption"] = latest_6_months_consumption[str(i['id_electricitymeter'])]
        
        return Response(queryset)    
    