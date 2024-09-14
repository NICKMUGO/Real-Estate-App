from django.shortcuts import render,get_object_or_404,redirect
from django.shortcuts import render
from django.http import HttpResponse
from .models import Properties


# Create your views here.

def home(request):
    return HttpResponse("Welcome to MakaoApp API")

def get_properties(request):
    if request.method == 'GET':
        properties = Properties.objects.all()
    return

def delete_property(request,property_id):
    property = get_object_or_404(Properties, id=property_id)
    if request.method == 'POST':
        property.delete() 
        # return redirect('properties_list')
    return












