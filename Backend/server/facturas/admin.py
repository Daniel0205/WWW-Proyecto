from django.contrib import admin

from .models import (Client,User)

admin.site.register([Client,User])