from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

from django.http import JsonResponse
from .firebase import firebase_db

def get_data_from_firebase(request):
    data = firebase_db.child('your-data-node').get()
    return JsonResponse(data)

def write_data_to_firebase(request):
    new_data = {
        "name": "John Doe",
        "email": "johndoe@example.com"
    }
    firebase_db.child('users').push(new_data)
    return JsonResponse({"message": "Data written successfully"})

from .firebase import db

def some_view(request):
    # Use Firestore
    docs = db.collection('users').get()
    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')
    # ... rest of your view code




