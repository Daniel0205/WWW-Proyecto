FROM python:3.6-stretch
ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
WORKDIR /backend

COPY ./requirements.txt .
COPY ./facturas ./facturas
COPY ./server ./server
COPY ./manage.py .
COPY ./scripts.txt .


RUN pip install -r requirements.txt
RUN python manage.py makemigrations facturas
RUN python manage.py migrate
RUN python manage.py shell < scripts.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver","0.0.0.0:8000"  ]

#sudo docker run --rm --publish 8000:8000 --detach --name bb back