from rest_framework import serializers
from .models import User,Payment,Property,Utility,UtilityProvider,Rental,Owner,Client,PayRent



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'

class PropertiesSerializer(serializers.ModelSerializer):
    # owner = OwnerSerializer(read_only=True)
    class Meta:
        model = Property
        fields='__all__'

class RentalSerializer(serializers.ModelSerializer):
    # property_id = PropertiesSerializer(read_only=True)
    # tenant = ClientSerializer(read_only=True)
    class Meta:
        model = Rental
        fields='__all__'

class UtilitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Utility
        fields='__all__'

class UtilityProviderSerializer(serializers.ModelSerializer):

    class Meta:
        model = UtilityProvider
        fields='__all__'

class PaymentSerializer(serializers.ModelSerializer):
    utility_id = UtilitySerializer(read_only=True)
    class Meta:
        model = Payment
        fields='__all__'

class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields='__all__'

class PayRentSerializer(serializers.ModelSerializer):

    class Meta:
        model = PayRent
        fields='__all__'

