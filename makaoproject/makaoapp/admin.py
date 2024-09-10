from django.contrib import admin
from .models import Users;
from .models import Properties;
from .models import Rentals;
from .models import Utility;
from .models import UtilityProvider;



admin.site.register(Users)
admin.site.register(Properties)
admin.site.register(Rentals)
admin.site.register(Utility)
admin.site.register(UtilityProvider)

