from django.db import models




class User(models.Model):
    ROLE_CHOICES = [
        ('client', 'Client'),
        ('owner', 'Owner'),
    ]
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True) 
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  
    phone_number = models.CharField(max_length=15)  
    address = models.CharField(max_length=255)  
    role = models.CharField(max_length=10, choices=ROLE_CHOICES,default='client')
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self): 
        return self.username

class Client(User):

    def save(self, *args, **kwargs):
        self.role = 'client' 
        super().save(*args, **kwargs)
    def __str__(self):
        return f"Client: {self.username}"


class Owner(User):

    def save(self, *args, **kwargs):
        self.role = 'owner' 
        super().save(*args, **kwargs)
    def __str__(self):
        return f"Owner: {self.username}"

class Property(models.Model):
    property_types = (
        ('apartment', 'Apartment'),
        ('bungalow', 'Bungalow'),
        ('mansion', 'Manison'),
    )
    status = (
        ('available', 'Available'),
        ('sold', 'Sold')
    )
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    property_type = models.CharField(max_length=100,choices=property_types)  
    image = models.ImageField(upload_to='properties/')  
    status = models.CharField(max_length=50 ,choices=status)  
    price = models.IntegerField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.property_type} - {self.price}"

class Rental(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Client, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    monthly_rent = models.IntegerField()
    payment_status = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rental for {self.property} by {self.tenant}"

class Utility(models.Model):
    utility_id = models.AutoField(primary_key=True)
    utility_type = models.CharField(max_length=255)  
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

class Payment(models.Model):

    property_id = models.ForeignKey(Property, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    utilityprovider = models.ForeignKey(UtilityProvider, on_delete=models.CASCADE)
    payment_id = models.AutoField(primary_key=True)
    amount = models.DecimalField(decimal_places=2, max_digits=9)
    payment_date = models.DateTimeField()
    payment_status = models.BooleanField() 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment for {self.property_id} by {self.user_id}"

class PayRent(models.Model):
    rental = models.ForeignKey(Rental, on_delete=models.CASCADE)
    tenant_id = models.ForeignKey(Client, on_delete=models.CASCADE) 
    payrent_id = models.AutoField(primary_key=True)
    amount = models.DecimalField(decimal_places=2, max_digits=9)
    payment_date = models.DateTimeField()
    payment_status = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Rent Payment for {self.rental} by {self.tenant}"

class PayProperty(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE) 
    buyer = models.ForeignKey(Client, on_delete=models.CASCADE) 
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE) 
    payproperty_id = models.AutoField(primary_key=True) 
    amount = models.DecimalField(decimal_places=2, max_digits=12) 
    payment_date = models.DateTimeField()  
    payment_status = models.BooleanField() 
    title_deed = models.FileField(upload_to='title_deeds/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Property Payment for {self.property} by {self.buyer}"
