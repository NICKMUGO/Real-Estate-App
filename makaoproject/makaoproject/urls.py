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
from makaoapp.views import ClientDetails ,ClientListCreate,OwnerDetails,OwnerListCreate,PropertyListCreate,PropertyDetails

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.home,name='home'),
    path('client/<int:pk>/',ClientDetails.as_view(),name='client_details'),
    path('client/',ClientListCreate.as_view(), name='client_listcreate'),
    path('owner/<int:pk>',OwnerDetails.as_view(),name='owner_details'),
    path('owner/',OwnerListCreate.as_view(),name='owner_listcreate'),
    path('property/',PropertyListCreate.as_view(),name='property_listcreate'),
    path('property/<int:pk>/',PropertyDetails.as_view(),name='property_details'),
]
