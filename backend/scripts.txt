from facturas.models import (User,Client,Apartment,Substation,Transformer,ElectricityMeter,Bank,Bill,Payment)
from django.contrib.auth.hashers import make_password

User.objects.all().delete()
Client.objects.all().delete()
Apartment.objects.all().delete()
Substation.objects.all().delete()
Transformer.objects.all().delete()
ElectricityMeter.objects.all().delete()
Bank.objects.all().delete()
Bill.objects.all().delete()
Payment.objects.all().delete()

User(id_user=1670129 ,name="Steban" ,last_name="Cadena" ,password=make_password('1234') ,type='O' ,active=True ,is_admin=True ,is_staff=True ,is_superuser=True).save()
User(id_user=1630536 ,name="Jem Pool" ,last_name="Suarez" ,password=make_password('1234') ,type='G' ,active=True ,is_admin=True ,is_staff=True ,is_superuser=True).save()
User(id_user=1629338 ,name="Daniel" ,last_name="Diaz" ,password=make_password('1234') ,type='A' ,active=True ,is_admin=True ,is_staff=True ,is_superuser=True).save()
User(id_user=1234567 ,name="Emma" ,last_name="Claus" ,password=make_password('1234') ,type='G' ,active=False ,is_admin=True ,is_staff=True ,is_superuser=True).save()


Client(id=1234 ,name="Juan" ,last_name="Perez",email="juan.perez@hotmail.com", type="N", shipping_way="F").save()
Client(id=9876 ,name="Maria" ,last_name="Lopez",email="maria.lopez@hotmail.com", type="N", shipping_way="E").save()
Client(id=2468 ,name="Angelica" ,last_name="Giraldo",email="angelica.giraldo@hotmail.com", type="N", shipping_way="F").save()

Substation(sector_name="Sur",lat_substation=3.379036 ,long_substation=-76.529983).save()
Substation(sector_name="Oriente",lat_substation=3.420708, long_substation=-76.502468).save()

Transformer(tension_level=500, active=True ,lat_transformer=3.382512, long_transformer=-76.538036, id_substation=Substation.objects.get(id_substation=1)).save()
Transformer(tension_level=400, active=True ,lat_transformer=3.419136, long_transformer=-76.502276, id_substation= Substation.objects.get(id_substation=1)).save()
Transformer(tension_level=600, active=True ,lat_transformer=3.376475, long_transformer=-76.525377, id_substation=Substation.objects.get(id_substation=2)).save()

ElectricityMeter(previous_measuring=0 ,previous_measuring_date='2020-02-24' ,actual_measuring=0 ,actual_measuring_date='2020-03-24' , id_transformer=Transformer.objects.get(id_transformer=1)).save()
ElectricityMeter(previous_measuring=4666 ,previous_measuring_date='2020-02-25' ,actual_measuring=4680 ,actual_measuring_date='2020-03-25' , id_transformer=Transformer.objects.get(id_transformer=1)).save()
ElectricityMeter(previous_measuring=0 ,previous_measuring_date='2020-02-25',actual_measuring=146 ,actual_measuring_date='2020-03-25' , id_transformer=Transformer.objects.get(id_transformer=2)).save()

Apartment(lat_address=3.382319 ,long_address=-76.536244 ,address="Cra x #y-z" ,stratum=2 ,id_user=User.objects.get(id_user=1670129) ,id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=1) ,id_user_client=Client.objects.get(id=1234)).save()
Apartment(lat_address=3.382307 ,long_address=-76.536536 ,address="Cll a #b-c" ,stratum=2 ,id_user=User.objects.get(id_user=1670129) ,id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=2) ,id_user_client=Client.objects.get(id=9876)).save()
Apartment(lat_address=3.418793 ,long_address=-76.501930 ,address="Cra i #j-k" ,stratum=1 ,id_user=User.objects.get(id_user=1630536) ,id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=3) ,id_user_client=Client.objects.get(id=2468)).save()

Bank(id_bank=555 ,name_bank="Banco popular").save()
Bank(id_bank=444 ,name_bank="Banco de Bogota").save()
Bank(id_bank=333 ,name_bank="Banco de Occidente").save()

Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=1) , quantity = 500000 , expedition_date='2020-02-27' ,due_date='2020-04-14' ,payment_status=False).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=2) , quantity = 600000 ,  expedition_date='2020-02-27' ,due_date='2020-04-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=3) , quantity = 300000 ,  expedition_date='2020-02-27' ,due_date='2020-04-14' ,payment_status=True).save()

Payment(payment_date='2020-04-05' ,quantity=50000 ,payment_method="O" ,id_bill=Bill.objects.get(id_bill=3) ,id_bank=Bank.objects.get(id_bank=555) ,id_user=User.objects.get(id_user=1670129)).save()
Payment(payment_date='2020-04-01' ,quantity=70000 ,payment_method="B" ,id_bill=Bill.objects.get(id_bill=2) ,id_bank=Bank.objects.get(id_bank=555) ,id_user=User.objects.get(id_user=1670129)).save()

