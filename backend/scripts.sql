from facturas.models import (User,Client,Apartment,Substation,Transformer,ElectricityMeter,Bank,Bill,Payment)
from django.contrib.auth.hashers import make_password

User.objects.all().delete()
Client.objects.all().delete()
Substation.objects.all().delete()
Transformer.objects.all().delete()
ElectricityMeter.objects.all().delete()
Apartment.objects.all().delete()
Bank.objects.all().delete()
Bill.objects.all().delete()
Payment.objects.all().delete()

User(id_user=1670129 ,name="Steban" ,last_name="Cadena" ,password=make_password('123456789') ,type='O' ,active=True ,is_admin=True ,is_staff=True ,is_superuser=True).save()
User(id_user=1630536 ,name="Jem Pool" ,last_name="Suarez" ,password=make_password('123456789') ,type='G' ,active=True ,is_admin=True ,is_staff=True ,is_superuser=True).save()
User(id_user=1629338 ,name="Daniel" ,last_name="Diaz" ,password=make_password('123456789') ,type='A' ,active=True ,is_admin=True ,is_staff=True ,is_superuser=True).save()
User(id_user=1234567 ,name="Emma" ,last_name="Claus" ,password=make_password('123456789') ,type='G' ,active=False ,is_admin=True ,is_staff=True ,is_superuser=True).save()
User(id_user=1670033 ,name="Blake" ,last_name="Russell" ,password=make_password('123456789') ,type='O' ,active=True ,is_admin=True ,is_staff=True ,is_superuser=True).save()
User(id_user=1682004 ,name="Ryan" ,last_name="Springer" ,password=make_password('123456789') ,type='O' ,active=True ,is_admin=True ,is_staff=True ,is_superuser=True).save()
User(id_user=1696090 ,name="Sally" ,last_name="McGrath" ,password=make_password('123456789') ,type='O' ,active=True ,is_admin=True ,is_staff=True ,is_superuser=True).save()
User(id_user=1710160 ,name="Emma" ,last_name="Claus" ,password=make_password('123456789') ,type='G' ,active=False ,is_admin=True ,is_staff=True ,is_superuser=True).save()

Client(id=1234 ,name="Juan" ,last_name="Perez",email="juan.perez@hotmail.com", type="N", shipping_way="F").save()
Client(id=9876 ,name="Maria" ,last_name="Lopez",email="maria.lopez@hotmail.com", type="N", shipping_way="E").save()
Client(id=2468 ,name="Angelica" ,last_name="Giraldo",email="angelica.giraldo@hotmail.com", type="N", shipping_way="F").save()
Client(id=5473 ,name="jhon" ,last_name="casas",email="jhon.casas@yahoo.com", type="N", shipping_way="F").save()
Client(id=6737 ,name="Alberto" ,last_name="contreras",email="alberto.contreras@gmail.com", type="N", shipping_way="E").save()

Substation(sector_name="Cl. 62 #1a 69, Cali, Valle del Cauca",lat_substation=3.479341 ,long_substation=-76.496303).save()
Substation(sector_name="Cl. 8 Oe. #28-2, Cali, Valle del Cauca",lat_substation=3.438436, long_substation=-76.547683).save()
Substation(sector_name="Cl. 9c Bis #29-43, Cali, Valle del Cauca",lat_substation=3.430350, long_substation=-76.533510).save()
Substation(sector_name="Cra. 33a #23-75, Cali, Valle del Cauca",lat_substation=3.423472, long_substation=-76.521051, active=False).save()

Transformer(tension_level=500, active=True ,lat_transformer=3.382512, long_transformer=-76.538036, id_substation=Substation.objects.get(id_substation=1)).save()
Transformer(tension_level=400, active=True ,lat_transformer=3.419136, long_transformer=-76.502276, id_substation= Substation.objects.get(id_substation=1)).save()
Transformer(tension_level=600, active=True ,lat_transformer=3.376475, long_transformer=-76.525377, id_substation=Substation.objects.get(id_substation=2)).save()
Transformer(tension_level=500, active=True ,lat_transformer=3.445336, long_transformer=-76.488061, id_substation=Substation.objects.get(id_substation=2)).save()
Transformer(tension_level=350, active=False ,lat_transformer=3.470374, long_transformer=-76.506150, id_substation=Substation.objects.get(id_substation=3)).save()

ElectricityMeter(previous_measuring=0 ,previous_measuring_date='2020-02-24' ,actual_measuring=0 ,actual_measuring_date='2020-03-24' , id_transformer=Transformer.objects.get(id_transformer=1)).save()
ElectricityMeter(previous_measuring=4666 ,previous_measuring_date='2020-02-25' ,actual_measuring=4680 ,actual_measuring_date='2020-03-25' , id_transformer=Transformer.objects.get(id_transformer=1)).save()
ElectricityMeter(previous_measuring=0 ,previous_measuring_date='2020-02-25',actual_measuring=146 ,actual_measuring_date='2020-03-25' , id_transformer=Transformer.objects.get(id_transformer=2)).save()
ElectricityMeter(previous_measuring=100 ,previous_measuring_date='2020-02-25',actual_measuring=320 ,actual_measuring_date='2020-03-25' , id_transformer=Transformer.objects.get(id_transformer=2)).save()
ElectricityMeter(previous_measuring=111 ,previous_measuring_date='2020-02-25',actual_measuring=290 ,actual_measuring_date='2020-03-25' , id_transformer=Transformer.objects.get(id_transformer=3)).save()

Apartment(lat_address=3.382319 ,long_address=-76.536244 ,address="Cll 13A1 85-99, El Ingenio Cali" ,stratum=4 ,id_user=User.objects.get(id_user=1670129) ,id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=1) ,id_user_client=Client.objects.get(id=1234)).save()
Apartment(lat_address=3.398205 ,long_address=-76.536536 ,address="Cra. 66 #13-24, El Limonar Cali" ,stratum=4 ,id_user=User.objects.get(id_user=1670129) ,id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=2) ,id_user_client=Client.objects.get(id=9876)).save()
Apartment(lat_address=3.482848 ,long_address=-76.500177 ,address="Cra. 4N #62N-63, Barrio Calima Cali" ,stratum=3 ,id_user=User.objects.get(id_user=1630536) ,id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=3) ,id_user_client=Client.objects.get(id=2468)).save()
Apartment(lat_address=3.431290 ,long_address=-76.515204 ,address="Cll 29 #N 25B-04, Villanueva Cali" ,stratum=2 ,id_user=User.objects.get(id_user=1630536) ,id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=4) ,id_user_client=Client.objects.get(id=5473)).save()
Apartment(lat_address=3.445336 ,long_address=-76.488061 ,address="Cll. 71a #14-63, La Nueva Base Cali" ,stratum=3 ,id_user=User.objects.get(id_user=1630536) ,id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=5) ,id_user_client=Client.objects.get(id=6737)).save()

Bank(id_bank=3214234 ,name_bank="Banco popular").save()
Bank(id_bank=8023489 ,name_bank="Banco de Bogota").save()
Bank(id_bank=3487132 ,name_bank="Banco de Occidente").save()

<<<<<<< HEAD
#-- id_electricitymeter=1 | Bills of last 6 months
||||||| merged common ancestors
-- id_electricitymeter=1 | Bills of last 6 months
=======
>>>>>>> 18ef64567c6d48b43b438c92d7f25aef1db69b85
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=1) , quantity = 388000 , expedition_date='2019-09-27' ,due_date='2019-11-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=1) , quantity = 388000 , expedition_date='2019-10-27' ,due_date='2019-12-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=1) , quantity = 470000 , expedition_date='2019-11-27' ,due_date='2020-01-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=1) , quantity = 390000 , expedition_date='2019-12-27' ,due_date='2020-02-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=1) , quantity = 405500 , expedition_date='2020-01-27' ,due_date='2020-03-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=1) , quantity = 500000 , expedition_date='2020-02-27' ,due_date='2020-04-14' ,payment_status=True).save()

<<<<<<< HEAD
#-- id_electricitymeter=2 | Bills of last 6 months
||||||| merged common ancestors
-- id_electricitymeter=2 | Bills of last 6 months
=======
>>>>>>> 18ef64567c6d48b43b438c92d7f25aef1db69b85
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=2) , quantity = 540000 ,  expedition_date='2019-09-27' ,due_date='2019-11-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=2) , quantity = 540000 ,  expedition_date='2019-10-27' ,due_date='2019-12-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=2) , quantity = 570000 ,  expedition_date='2019-11-27' ,due_date='2020-01-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=2) , quantity = 479000 ,  expedition_date='2019-12-27' ,due_date='2020-02-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=2) , quantity = 670000 ,  expedition_date='2020-01-27' ,due_date='2020-03-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=2) , quantity = 770000 ,  expedition_date='2020-02-27' ,due_date='2020-04-14' ,payment_status=True).save()

<<<<<<< HEAD
#-- id_electricitymeter=3 | Bills of last 6 months
||||||| merged common ancestors
-- id_electricitymeter=3 | Bills of last 6 months
=======
>>>>>>> 18ef64567c6d48b43b438c92d7f25aef1db69b85
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=3) , quantity = 490000 ,  expedition_date='2019-09-27' ,due_date='2019-11-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=3) , quantity = 490000 ,  expedition_date='2019-10-27' ,due_date='2019-12-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=3) , quantity = 590000 ,  expedition_date='2019-11-27' ,due_date='2020-01-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=3) , quantity = 530000 ,  expedition_date='2019-12-27' ,due_date='2020-02-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=3) , quantity = 550000 ,  expedition_date='2020-01-27' ,due_date='2020-03-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=3) , quantity = 300000 ,  expedition_date='2020-02-27' ,due_date='2020-04-14' ,payment_status=True).save()

Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=4) , quantity = 450000 ,  expedition_date='2019-09-27' ,due_date='2019-11-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=4) , quantity = 390000 ,  expedition_date='2019-10-27' ,due_date='2019-12-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=4) , quantity = 490600 ,  expedition_date='2019-11-27' ,due_date='2020-01-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=4) , quantity = 530000 ,  expedition_date='2019-12-27' ,due_date='2020-02-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=4) , quantity = 450000 ,  expedition_date='2020-01-27' ,due_date='2020-03-14' ,payment_status=False).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=4) , quantity = 350000 ,  expedition_date='2020-02-27' ,due_date='2020-04-14' ,payment_status=False).save()

Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=5) , quantity = 390500 ,  expedition_date='2019-09-27' ,due_date='2019-11-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=5) , quantity = 410600 ,  expedition_date='2019-10-27' ,due_date='2019-12-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=5) , quantity = 440600 ,  expedition_date='2019-11-27' ,due_date='2020-01-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=5) , quantity = 512000 ,  expedition_date='2019-12-27' ,due_date='2020-02-14' ,payment_status=True).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=5) , quantity = 455000 ,  expedition_date='2020-01-27' ,due_date='2020-03-14' ,payment_status=False).save()
Bill(id_electricitymeter=ElectricityMeter.objects.get(id_electricitymeter=5) , quantity = 350000 ,  expedition_date='2020-02-27' ,due_date='2020-04-14' ,payment_status=False).save()

Payment(payment_date='2020-04-05' ,quantity=50000 ,payment_method="O" ,id_bill=Bill.objects.get(id_bill=3) ,id_bank=Bank.objects.get(id_bank=3214234) ,id_user=User.objects.get(id_user=1670129)).save()
Payment(payment_date='2020-04-01' ,quantity=70000 ,payment_method="B" ,id_bill=Bill.objects.get(id_bill=2) ,id_bank=Bank.objects.get(id_bank=3214234) ,id_user=User.objects.get(id_user=1670129)).save()
Payment(payment_date='2020-04-03' ,quantity=66000 ,payment_method="B" ,id_bill=Bill.objects.get(id_bill=1) ,id_bank=Bank.objects.get(id_bank=8023489) ,id_user=User.objects.get(id_user=1670129)).save()

