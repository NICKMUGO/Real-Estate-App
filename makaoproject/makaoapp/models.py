from django.db import models

# Create your models here.

class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True) 
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  
    phone_number = models.CharField(max_length=15)  
    address = models.CharField(max_length=255)  
    usertype = models.CharField(max_length=50)  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

class Properties(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    property_type = models.CharField(max_length=100)  
    image = models.ImageField(upload_to='properties/')  
    status = models.CharField(max_length=50)  
    price = models.IntegerField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.property_type} - {self.price}"

class Rentals(models.Model):
    property_id = models.ForeignKey(Properties, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    monthly_rent = models.IntegerField()
    payment_status = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rental for {self.property_id} by {self.user_id}"

class Utility(models.Model):
    utility_id = models.AutoField(primary_key=True)
    utility_type = models.CharField(max_length=255)  # Added max_length
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.utility_type

class UtilityProvider(models.Model):
    provider_id = models.AutoField(primary_key=True)
    provider_name = models.CharField(max_length=100)  # Added max_length
    contact_info = models.TextField()
    utility_id = models.ForeignKey(Utility, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.provider_name
