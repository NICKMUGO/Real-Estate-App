from django.shortcuts import render,get_object_or_404,redirect
from rest_framework.permissions import AllowAny
from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from .models import Property ,Payment,User,Rental,Property,UtilityProvider,Utility,Owner,Client
from rest_framework import generics,status
from .serializers import UserSerializer,PropertiesSerializer,RentalSerializer,UtilityProviderSerializer,UtilitySerializer,PaymentSerializer
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.utils import timezone
import json

# Create your views here.

def home(request):
    return HttpResponse("Welcome to MakaoApp API")
class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= User.objects.all()
    serializer_class= UserSerializer
    permission_classes = [AllowAny]

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        role = request.data.get('role', 'client') 

        request_data = request.data.copy()  
        request_data['role'] = role

        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)
    
        user = serializer.save()

        if role == 'owner':
            user.role = 'owner'  
            user.save()  
            Owner.objects.create(
                user_ptr=user,
                username=user.username,
                email=user.email,
                password=user.password,
                phone_number=user.phone_number,
                address=user.address,
                created_at=timezone.now(),
                updated_at=timezone.now()
            )
        else:
            user.role = 'client'  
            user.save() 
            Client.objects.create(
                user_ptr=user, 
                username=user.username,
                email=user.email,
                password=user.password,  
                phone_number=user.phone_number,
                address=user.address,
                created_at=timezone.now(),
                updated_at=timezone.now()
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

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

@csrf_exempt
def Login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
        
            if not email or not password:
                return JsonResponse({'error': 'Email and password are required.'}, status=400)
            
            user = User.objects.filter(email=email, password=password).first()

            if user:
                user_data = {
                    'user_id': user.user_id,
                    'username': user.username,
                    'email': user.email,
                    'phone_number': user.phone_number,
                    'address': user.address,
                    'role': user.role,
                    'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                    'updated_at': user.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
                }
                return JsonResponse({'user': user_data}, status=200)
            else:
                return JsonResponse({'error': 'Invalid email or password'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


















