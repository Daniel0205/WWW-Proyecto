from django.urls import path 

from .views import (
   
   #User
   UserListView,
   RegisterView,
   UserUpdateView,
   Login,
   
   #Client
   ClientCreateView,
   ClientUpdateView,
   ClientListView,

   #Apartment
   ApartmentCreateView,
   ApartmentUpdateView,
   ApartmentListView,

   #Substation
   SubstationCreateView,
   SubstationUpdateView,
   SubstationListView,

   #Transformer
   TransformerCreateView,
   TransformerUpdateView,
   TransformerListView,

   #ElectricityMeter
   ElectricityMeterCreateView,
   ElectricityMeterUpdateView,
   ElectricityMeterListView,

   #Bank
   BankCreateView,
   BankUpdateView,
   BankListView,

   #Bill
   BillCreateView,
   BillUpdateView,
   BillListView,

   #Payment
   PaymentCreateView,
   PaymentUpdateView,
   PaymentListView,

)


urlpatterns = [
    #User-login
    path('login/', Login.as_view()),
    path('register/', RegisterView.as_view()),
    
    #Client
    path('client', ClientListView.as_view()),
    path('client/update/<pk>',ClientUpdateView.as_view()),
    path('client/create/',ClientCreateView.as_view()),
    
    #User
    path('user', UserListView.as_view()),
    path('user/update/<pk>',UserUpdateView.as_view()),

    #Apartments
    path('apartment', ApartmentListView.as_view()),
    path('apartment/update/<pk>',ApartmentUpdateView.as_view()),
    path('apartment/create/',ApartmentCreateView.as_view()),

    #Substation
    path('substation', SubstationListView.as_view()),
    path('substation/update/<pk>',SubstationUpdateView.as_view()),
    path('substation/create/',SubstationCreateView.as_view()),

    #Transformer
    path('transformer', TransformerListView.as_view()),
    path('transformer/update/<pk>',TransformerUpdateView.as_view()),
    path('transformer/create/',TransformerCreateView.as_view()),

    #ElectricityMeter
    path('electricitymeter', ElectricityMeterListView.as_view()),
    path('electricitymeter/update/<pk>',ElectricityMeterUpdateView.as_view()),
    path('electricitymeter/create/',ElectricityMeterCreateView.as_view()),

    #Bank
    path('bank', BankListView.as_view()),
    path('bank/update/<pk>',BankUpdateView.as_view()),
    path('bank/create/',BankCreateView.as_view()),

    #Bill
    path('bill', BillListView.as_view()),
    path('bill/update/<pk>',BillUpdateView.as_view()),
    path('bill/create/',BillCreateView.as_view()),

    #Payment
    path('payment', PaymentListView.as_view()),
    path('payment/update/<pk>',PaymentUpdateView.as_view()),
    path('payment/create/',PaymentCreateView.as_view()),

]