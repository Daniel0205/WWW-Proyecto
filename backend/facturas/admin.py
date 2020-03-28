from django.contrib import admin

from .models import (Client,User,Bank)

admin.site.register([Client,User,Bank])
