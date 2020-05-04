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
    last_name = models.TextField(null=True)
    email = models. EmailField(null=False,max_length=254)

    TYPE_CHOICES = {
        ("N", "natural"),
        ("J", "juridica")
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

#Substation Model
class Substation(models.Model):
    id_substation =  models.AutoField(primary_key=True)
    sector_name = models.TextField(null=False)
    lat_substation = models.DecimalField(null=True, max_digits=22, decimal_places=16)
    long_substation = models.DecimalField(null=True, max_digits=22, decimal_places=16)
    active = models.BooleanField(default=True)

#Transformer Model
class Transformer(models.Model):
    id_transformer =  models.AutoField(primary_key=True)
    tension_level = models.IntegerField(null=False)
    lat_transformer = models.DecimalField(null=True, max_digits=22, decimal_places=16)
    long_transformer = models.DecimalField(null=True, max_digits=22, decimal_places=16)
    id_substation = models.ForeignKey(Substation,on_delete=models.CASCADE, verbose_name="substation to which it belongs the transformer", null=False)

#ElectricityMeter Model
class ElectricityMeter(models.Model):
    id_electricitymeter =  models.AutoField(primary_key=True)
    previous_measuring = models.IntegerField(null=False)
    previous_measuring_date = models.DateField(auto_now=False)
    actual_measuring = models.IntegerField(null=False)
    actual_measuring_date = models.DateField(auto_now=False)
    id_transformer = models.ForeignKey(Transformer,on_delete=models.CASCADE, verbose_name="Transformer from which the electricity meter is connected", null=False)

#Apartments Model
class Apartment(models.Model):
    num_contract =  models.AutoField(primary_key=True)
    lat_address = models.DecimalField(null=True, max_digits=22, decimal_places=16)
    long_address = models.DecimalField(null=True, max_digits=22, decimal_places=16)
    address = models.TextField()
    stratum = models.IntegerField(null=True)
    id_user = models.ForeignKey(User,on_delete=models.CASCADE, verbose_name="User who created the apartment", null=False)
    id_electricitymeter = models.ForeignKey(ElectricityMeter,on_delete=models.CASCADE, verbose_name="Electricitymeter assigned to the apartment", null=False)
    id_user_client = models.ForeignKey(Client,on_delete=models.CASCADE, verbose_name="Client owner of the apartment", null=False)
    active = models.BooleanField(default=True)

#Bank Model
class Bank(models.Model):
    id_bank =  models.IntegerField(primary_key=True)
    name_bank = models.TextField(null=False)

    CITY_CHOICES = {
        ("B", "Bogota"),
        ("C", "Cali"),
        ("M", "Medellin")
    }

    city_bank = models.CharField(null=False,max_length=1, choices=CITY_CHOICES,
        default="C")
    
    active = models.BooleanField(default=True)

#Bill Model
class Bill(models.Model):
    id_bill = models.AutoField(primary_key=True)
    id_electricitymeter = models.ForeignKey(ElectricityMeter,on_delete=models.CASCADE, verbose_name="Bill's electricitymeter ", null=False)
    expedition_date = models.DateTimeField(auto_now=False)
    due_date = models.DateTimeField(auto_now=False)
    payment_status = models.BooleanField(default=False)

#Payment Model
class Payment(models.Model):
    id_payment = models.AutoField(primary_key=True)
    payment_date = models.DateTimeField(auto_now=False)
    cuantity = models.IntegerField(null=False)

    PAYMENT_CHOICES = {
        ("B", "bank"),
        ("O", "office")
    }

    payment_method = models.CharField(null=False,max_length=1, choices=PAYMENT_CHOICES,default="O")
    id_bill = models.ForeignKey(Bill,on_delete=models.CASCADE, verbose_name="Bill related payment", null=False)
    id_bank = models.ForeignKey(Bank,on_delete=models.CASCADE, verbose_name="Bank who made the pay", null=False)
    id_user = models.ForeignKey(User,on_delete=models.CASCADE, verbose_name="User who made the pay", null=False)


