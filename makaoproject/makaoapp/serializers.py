from rest_framework import serializers
from .models import User,Payment,Property,Utility,UtilityProvider,Rental,Owner



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'

class PropertiesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields='__all__'

class RentalSerializer(serializers.ModelSerializer):

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

