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
    

]