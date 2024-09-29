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
from django.urls import path
from makaoapp import views
from makaoapp.views import (
    UserDetails, UserListCreate, PropertyListCreate, PropertyDetails,
    RentalListCreate, RentalDetails, PaymentDetails, PaymentListCreate,
    UtilityDetails, UtilityListCreate, UtilityProviderListCreate, UtilityProviderDetails,Login,logout
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('user/<int:pk>/', UserDetails.as_view(), name='user_details'),
    path('users/', UserListCreate.as_view(), name='user_listcreate'),
    path('properties/', PropertyListCreate.as_view(), name='property_listcreate'),
    path('property/<int:pk>/', PropertyDetails.as_view(), name='property_details'),
    path('rental/', RentalListCreate.as_view(), name='rental_listcreate'),
    path('rental/<int:pk>/', RentalDetails.as_view(), name='rental_details'),
    path('payment/', PaymentListCreate.as_view(), name='payment_listcreate'),
    path('payment/<int:pk>/', PaymentDetails.as_view(), name='payment_details'),
    path('utility/', UtilityListCreate.as_view(), name='utility_listcreate'),
    path('utility/<int:pk>/', UtilityDetails.as_view(), name='utility_details'),
    path('utilityprovider/', UtilityProviderListCreate.as_view(), name='utilityprovider_listcreate'),
    path('utilityprovider/<int:pk>/', UtilityProviderDetails.as_view(), name='utilityprovider_details'),
    path('login/',views.Login,name='login'),
    path('logout/',views.logout,name='logout')
]
