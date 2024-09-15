from django.shortcuts import render,get_object_or_404,redirect
from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from .models import Property ,Payment,Owner,Rental,Property,UtilityProvider,Utility


# Create your views here.

def home(request):
    return HttpResponse("Welcome to MakaoApp API")

def get_properties(request):
    if request.method == 'GET':
        properties = Property.objects.all()
        properties_list= list(properties)
    return JsonResponse(properties_list,safe=False)

def get_payments(request):
    if request.method == 'GET':
        payments = Payment.objects.all()
        payments_list= list(payments)
    return JsonResponse(payments_list,safe=False)

def get_rentals(request):
    if request.method == 'GET':
        owners = Owner.objects.all()
        owners_list= list(owners)
    return JsonResponse(owners_list,safe=False)

def get_properties(request):
    if request.method == 'GET':
        owners = Owner.objects.all()
        owners_list= list(owners)
    return JsonResponse(owners_list,safe=False)

def get_utilities(request):
    if request.method == 'GET':
        owners = Owner.objects.all()
        owners_list= list(owners)
    return JsonResponse(owners_list,safe=False)











