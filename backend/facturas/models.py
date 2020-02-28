from django.db import models

from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

#from django.contrib.auth.models import UserManager

# Create your models here.


from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class MyUserManager(BaseUserManager):
    def create_user(self,id_user, name,last_name,type,password):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
   

        user = self.model(
            id_user=id_user,
            name=name,
            last_name=last_name,
            type=type,
            password=password,
            active=True
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,id_user, name,last_name,type,password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            id_user=id_user,
            name=name,
            last_name=last_name,
            password=password,
            type=type,
        
            
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):

    REQUIRED_FIELDS = ('name','last_name','type','password')
    USERNAME_FIELD = 'id_user'
    objects = MyUserManager()

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


    
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=True)


    def __str__(self):
        return str(self.id_user)+"-"+self.name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
  


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


