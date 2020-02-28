from django.urls import path 

from .views import (
   UserListView,
   UserDetailView,
   UserCreateView,
   UserUpdateView,
)


urlpatterns = [
    path('user', UserListView.as_view()),
    path('user/<pk>',UserDetailView.as_view()),
    path('user/update/<pk>',UserUpdateView.as_view()),
    

]