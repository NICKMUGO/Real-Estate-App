"""makaoproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from makaoapp import views
from makaoapp.views import (
    UserDetails, UserListCreate, PropertyListCreate, PropertyDetails,
    RentalListCreate, RentalDetails, PaymentDetails, PaymentListCreate,
    UtilityDetails, UtilityListCreate, UtilityProviderListCreate, UtilityProviderDetails,Login,logout,PropertyByUserId,PaymentsByUserId,OwnerDetails,OnwerListCreate,ClienListCreate,ClientDetails,RentalsByUserId
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('userprofile/<int:pk>/', UserDetails.as_view(), name='user_details'),
    path('users/', UserListCreate.as_view(), name='user_listcreate'),
    path('client/<int:pk>/', ClientDetails.as_view(), name='user_details'),
    path('clients/', ClienListCreate.as_view(), name='user_listcreate'),
    path('properties/', PropertyListCreate.as_view(), name='property_listcreate'),
    path('property/<int:pk>/', PropertyDetails.as_view(), name='property_details'),
    path('rentals/', RentalListCreate.as_view(), name='rental_listcreate'),
    path('rental/<int:pk>/', RentalDetails.as_view(), name='rental_details'),
    path('payment/', PaymentListCreate.as_view(), name='payment_listcreate'),
    path('payment/<int:pk>/', PaymentDetails.as_view(), name='payment_details'),
    path('utility/', UtilityListCreate.as_view(), name='utility_listcreate'),
    path('utility/<int:pk>/', UtilityDetails.as_view(), name='utility_details'),
    path('utilityprovider/', UtilityProviderListCreate.as_view(), name='utilityprovider_listcreate'),
    path('utilityprovider/<int:pk>/', UtilityProviderDetails.as_view(), name='utilityprovider_details'),
    path('login/',views.Login,name='login'),
    path('logout/',views.logout,name='logout'),
    path('properties/user/<int:user_id>/', PropertyByUserId.as_view(), name='properties_by_user_id'),
    path('payments/user/<int:user_id>/', PaymentsByUserId.as_view(), name='payments_by_user_id'),
    path('owners/', OnwerListCreate.as_view(), name='onwer_listcreate'),
    path('owner/<int:pk>/', OwnerDetails.as_view(), name='onwer_details'),
    path('rentalUser/<int:owner_id>/', RentalsByUserId.as_view(), name='rental_by_user'),  
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)