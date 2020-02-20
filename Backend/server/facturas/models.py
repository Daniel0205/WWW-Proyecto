from django.db import models

# Create your models here.

class Client(models.Model):
    id =  models.IntegerField(primary_key=True)
    name = models.TextField(null=True)
    apellidos = models.TextField(null=True)
    email = models. EmailField(null=True,max_length=254)


    TYPE_CHOICES = {
        ("N", "natural"),
        ("j", "juridica"),
    }

    type = models.CharField(null=True,max_length=1, choices=TYPE_CHOICES,
        default="N")
  

    WAY_CHOICES = {
        ("L", "Linea"),
        ("F", "Fisico"),
        ("E", "Email"),
    }
    shipping_way = models.CharField(null=True,max_length=1, choices=WAY_CHOICES,
        default="L")