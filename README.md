# Proyecto WWW

## Django

Crear un entorno virtual para instalar las dependencias de Python y posteriormente activar este entorno virtual

```sh
$ virtualenv venvDjango
$ # en Linux 
$ source venvDjango/bin/activate
$ # en Windows 
$ .\venvDjango\Scripts\activate
```

Luego clonar el repositorio dentro del folder del entorno virtual:

```sh
$ cd venvDjango
$ git clone https://github.com/Daniel0205/WWW-Proyecto
```


Luego instalamos las dependencias:

```sh
(venvDjango)$ cd WWW-Proyecto
(venvDjango)$ cd backend
(venvDjango)$ pip install -r requirements.txt
```
Nota el `(venvDjango)` frente al prompt. Esto indica que el entono virtual esta activado.

Inicialmente y cuando se modifiquen los modelos, debemos ejecutar los siguientes comandos:

```sh
(venvDjango)$ python3 manage.py makemigrations
(venvDjango)$ python3 manage.py migrate
(venvDjango)$ # Opcionalmente cuando se presentan algunos problemas en la migracion
(venvDjango)$ python3 manage.py migrate --run-syncdb
```

Una vez `pip` ha terminado de descargar las dependencias y hacer las migraciones, corrremos el servidor de Django:
```sh
(venvDjango)$ python manage.py runserver
```
Podemos acceder al servidor de Django a través de un navegador, en la ruta  `http://127.0.0.1:8000/`.

Para correr el proyecto posteriormente solo se debe activar el entorno virtual como se indicó en el primer paso.

## React

En una terminal diferente a la de Django:

```sh
$ cd WWW-Proyecto
$ cd frontend
$ npm install
$ npm start
```
