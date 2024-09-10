from django.db import models


# Create your models here.
# Create your models here.

class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField()
    phone_number = models.IntegerField()
    address = models.CharField()
    usertype = models.CharField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    
class Properties(models.Model):
    user_id= models.ForeignKey(Users, on_delete=models.CASCADE)
    property_type=models.CharField()
    image= models.ImageField()
    status=models.CharField()
    price= models.IntegerField()
    description= models.TextField()
    created_at= models.DateTimeField()
    updated_at= models.DateTimeField()

class Rentals(models.Model):
    property_id=models.ForeignKey(Properties,on_delete=models.CASCADE)
    user_id=models.ForeignKey(Users, on_delete=models.CASCADE)
    start_date=models.DateTimeField()
    end_date=models.DateTimeField()
    monthly_rent=models.IntegerField()
    payment_status=models.BooleanField()
    created_at=models.DateTimeField()

class Utility(models.Model):
    utility_id = models.AutoField(primary_key=True)
    utility_type = models.CharField(max_length=255)  # Adjust max_length based on your requirements
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.utility_type
class UtilityProvider(models.Model):
    provider_id = models.AutoField(primary_key=True)
    provider_name = models.CharField(max_length=100)
    contact_info = models.TextField()
    utility_id = models.ForeignKey(Utility, on_delete=models.CASCADE)  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.provider_name



