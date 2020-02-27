from django.urls import path 

from .views import UserListView, UserDetailView

urlpatterns = [
    path('user', UserListView.as_view()),
    path('user/<pk>',UserDetailView.as_view())

]