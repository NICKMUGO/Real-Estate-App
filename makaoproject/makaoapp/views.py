from django.shortcuts import render,get_object_or_404,redirect
from rest_framework.permissions import AllowAny
from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from .models import Property ,Payment,User,Rental,Property,UtilityProvider,Utility
from rest_framework import generics
from .serializers import UserSerializer,PropertiesSerializer,RentalSerializer,UtilityProviderSerializer,UtilitySerializer,PaymentSerializer


# Create your views here.

def home(request):
    return HttpResponse("Welcome to MakaoApp API")
class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= User.objects.all()
    serializer_class= UserSerializer
    permission_classes = [AllowAny]

class UserListCreate(generics.ListCreateAPIView):
    queryset= User.objects.all()
    serializer_class= UserSerializer
    permission_classes = [AllowAny]

class PropertyListCreate(generics.ListCreateAPIView):
    queryset= Property.objects.all()
    serializer_class= PropertiesSerializer
    permission_classes = [AllowAny]

class PropertyDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= Property.objects.all()
    serializer_class= PropertiesSerializer
    permission_classes = [AllowAny]

class RentalListCreate(generics.ListCreateAPIView):
    queryset= Rental.objects.all()
    serializer_class= RentalSerializer
    permission_classes = [AllowAny]

class RentalDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= Rental.objects.all()
    serializer_class= RentalSerializer
    permission_classes = [AllowAny]

class PaymentListCreate(generics.ListCreateAPIView):
    queryset= Payment.objects.all()
    serializer_class= PaymentSerializer
    permission_classes = [AllowAny]

class PaymentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= Payment.objects.all()
    serializer_class= PaymentSerializer
    permission_classes = [AllowAny]

class UtilityListCreate(generics.ListCreateAPIView):
    queryset= Utility.objects.all()
    serializer_class= UtilitySerializer
    permission_classes = [AllowAny]

class UtilityDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= Utility.objects.all()
    serializer_class= UtilitySerializer
    permission_classes = [AllowAny] 

class UtilityProviderListCreate(generics.ListCreateAPIView):
    queryset= UtilityProvider.objects.all()
    serializer_class= UtilityProviderSerializer
    permission_classes = [AllowAny]

class UtilityProviderDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= Utility.objects.all()
    serializer_class= UtilityProviderSerializer
    permission_classes = [AllowAny] 
















