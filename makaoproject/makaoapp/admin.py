from django.contrib import admin
from .models import Client;
from .models import Property;
from .models import Rental;
from .models import Utility;
from .models import UtilityProvider;
from .models import Payment
from .models import Owner



admin.site.register(Client)
admin.site.register(Property)
admin.site.register(Rental)
admin.site.register(Utility)
admin.site.register(UtilityProvider)
admin.site.register(Payment)
admin.site.register(Owner)

