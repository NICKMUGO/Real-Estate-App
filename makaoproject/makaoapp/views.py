from django.shortcuts import render,get_object_or_404,redirect
from rest_framework.permissions import AllowAny
from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from .models import Property ,Payment,Owner,Rental,Property,UtilityProvider,Utility,Client
from rest_framework import generics
from .serializers import ClientSerializer,OwnerSerializer


# Create your views here.

def home(request):
    return HttpResponse("Welcome to MakaoApp API")

class ClientDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= Client.objects.all()
    serializer_class=ClientSerializer
    permission_classes = [AllowAny]

class OwnerDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= Owner.objects.all()
    serializer_class= OwnerSerializer
    permission_classes = [AllowAny]
    












