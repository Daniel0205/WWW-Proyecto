from django.urls import path 

from .views import (
   UserListView,
   UserDetailView,
   RegisterView,
   UserUpdateView,
   Login,
)


urlpatterns = [
    path('login/', Login.as_view()),
    path('register/', RegisterView.as_view()),


    path('user', UserListView.as_view()),
    path('user/<pk>',UserDetailView.as_view()),
    path('user/update/<pk>',UserUpdateView.as_view()),
    

]