FROM python:3.6-stretch
ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app

COPY ./requirements.txt .
COPY ./ ./

RUN pip install -r requirements.txt
RUN python manage.py makemigrations facturas
RUN python manage.py migrate
RUN python manage.py shell < scripts.txt

RUN useradd -s /bin/bash myuser
USER myuser

#If you wanna test with compose, enable the follow lines

#EXPOSE 8000

#ENTRYPOINT ["python", "manage.py"]
#CMD ["runserver", "0.0.0.0:8000"]