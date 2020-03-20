from django.db import models

from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

#from django.contrib.auth.models import UserManager

# Create your models here.


from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

from django.contrib.auth.models import PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, password, **extra_fields): 
        user = self.model(**extra_fields)        
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', False)
        user = self.create_user(password, **extra_fields)
        return user

    def create_superuser(self, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        user = self.create_user(password, **extra_fields)
        return user


class User(AbstractBaseUser):

    REQUIRED_FIELDS = ('name','last_name','type','password')
    USERNAME_FIELD = 'id_user'
    objects = UserManager()

    id_user =  models.IntegerField(primary_key=True)
    name = models.TextField(null=False)
    last_name = models.TextField(null=False)
    password = models.CharField(max_length=15)
    
    TYPE_CHOICES = {
        ("O", "Operador"),
        ("G", "Gerente"),
        ("A", "Administrador")
    }

    type = models.CharField(null=False,max_length=1, choices=TYPE_CHOICES,
        default="O")
    active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)



    def __str__(self):
        return str(self.id_user)+"-"+self.name
  


class Client(models.Model):

    id =  models.IntegerField(primary_key=True)
    name = models.TextField(null=False)
    last_name = models.TextField(null=False)
    email = models. EmailField(null=False,max_length=254)


    TYPE_CHOICES = {
        ("N", "natural"),
        ("j", "juridica")
    }

    type = models.CharField(null=False,max_length=1, choices=TYPE_CHOICES,
        default="N")
  

    WAY_CHOICES = {
        ("L", "Linea"),
        ("F", "Fisico"),
        ("E", "Email")
    }
    shipping_way = models.CharField(null=False,max_length=1, choices=WAY_CHOICES,
        default="L")


