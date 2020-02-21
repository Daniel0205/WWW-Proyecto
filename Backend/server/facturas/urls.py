from django.urls import path 

from .views import FacturaListView, FacturaDetailView

urlpatterns = [
    path('', FacturaListView.as_view()),
    path('<pk>',FacturaDetailView.as_view())

]