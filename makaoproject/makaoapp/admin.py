from django.contrib import admin
from .models import User;
from .models import Property;
from .models import Rental;
from .models import Utility;
from .models import UtilityProvider;
from .models import Payment
from .models import PayRent
from .models import Owner
from .models import Client,PayProperty




admin.site.register(User)
admin.site.register(Property)
admin.site.register(Rental)
admin.site.register(Utility)
admin.site.register(UtilityProvider)
admin.site.register(Payment)
admin.site.register(PayRent)
admin.site.register(Owner)
admin.site.register(Client)
admin.site.register(PayProperty)




