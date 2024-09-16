from rest_framework import serializers
from .models import User,Owner,Payment,Property,Utility,UtilityProvider,Rental
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class OwnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Owner
        fields='__all__'

class PropertiesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields='__all__'


