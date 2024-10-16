from django.shortcuts import render,get_object_or_404,redirect
from rest_framework.permissions import AllowAny
from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from .models import Property ,Payment,User,Rental,UtilityProvider,Utility,Owner,Client
from rest_framework import generics,status
from .serializers import UserSerializer,PropertiesSerializer,RentalSerializer,UtilityProviderSerializer,UtilitySerializer,PaymentSerializer,OwnerSerializer,ClientSerializer
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.utils import timezone
import json
import logging
from django.utils.decorators import method_decorator

logger = logging.getLogger(__name__)

# Create your views here.

def home(request):
    return HttpResponse("Welcome to MakaoApp API")
@method_decorator(csrf_exempt, name='dispatch')
class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= User.objects.all()
    serializer_class= UserSerializer
    permission_classes = [AllowAny]

@method_decorator(csrf_exempt, name='dispatch')
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        logger.info("Entering UserListCreate view")
        logger.info(f"Request data: {request.data}")
        
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

class OwnerDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= Owner.objects.all()
    serializer_class= OwnerSerializer
    permission_classes = [AllowAny]

class OnwerListCreate(generics.ListCreateAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    permission_classes = [AllowAny] 

class ClientDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= Client.objects.all()
    serializer_class= ClientSerializer
    permission_classes = [AllowAny]

class ClienListCreate(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [AllowAny] 

class PropertyListCreate(generics.ListCreateAPIView):
    queryset= Property.objects.all()
    serializer_class= PropertiesSerializer
    permission_classes = [AllowAny]

    # def dispatch(self, request, *args, **kwargs):
    #     if 'user_id' not in request.session:
    #         return JsonResponse({'error': 'You must be logged in to access this resource.'}, status=401)
    #     return super().dispatch(request, *args, **kwargs)

@method_decorator(csrf_exempt, name='dispatch')
class PropertyDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= Property.objects.all()
    serializer_class= PropertiesSerializer
    permission_classes = [AllowAny]

    # def dispatch(self, request, *args, **kwargs):
    #     if 'user_id' not in request.session:
    #         print(f"Session data: {request.session.items()}")
    #         return JsonResponse({'error': 'You must be logged in to access this resource.'}, status=401)
    #     print(f"User allowed: user_id={request.session['user_id']}")
    #     return super().dispatch(request, *args, **kwargs)
@method_decorator(csrf_exempt, name='dispatch')
class RentalListCreate(generics.ListCreateAPIView):
    queryset= Rental.objects.all()
    serializer_class= RentalSerializer
    permission_classes = [AllowAny]

    # def dispatch(self, request, *args, **kwargs):
    #     if 'user_id' not in request.session:
    #         return JsonResponse({'error': 'You must be logged in to access this resource.'}, status=401)
    #     return super().dispatch(request, *args, **kwargs)

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
                request.session['user_id'] = user.id
                request.session['username'] = user.username
                request.session['role'] = user.role
                print(f"Session data set: user_id={request.session['user_id']}, username={request.session['username']}, role={request.session['role']}")
                user_data = {
                    'user_id': user.id,
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

@csrf_exempt
def logout(request):
    request.session.flush()  # Clears the session
    return JsonResponse({'message': 'Logged out successfully'}, status=200)

class PropertyByUserId(generics.ListAPIView):
    serializer_class = PropertiesSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Property.objects.filter(owner__user_ptr=user_id) 

class PaymentsByUserId(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Payment.objects.filter(user_id=user_id) 

class RentalsByUserId(generics.ListAPIView):
    serializer_class = RentalSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        owner_id = self.kwargs['owner_id']
        return Rental.objects.filter(property__owner__user_ptr=owner_id)















