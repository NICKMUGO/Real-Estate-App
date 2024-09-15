from rest_framework import serializers
from .models import Client,Owner,Payment,Property,Utility,UtilityProvider,Rental
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class OwnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Owner
        fields='__all__'


