from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey


# class Category(models.Model):
#     category_name = models.CharField(max_length=100) 
    # admin = models.ForeignKey(User,on_delete=models.CASCADE,default=5)

    # def __str__(self):
    #     return self.category_name

    
# Correct the ForeignKey reference
class UserData(models.Model):
    name = models.CharField(max_length=100) 
    contact = models.CharField(max_length=100)
    USER_TYPES = (
        ('admin', 'Admin'),
        ('customer', 'Customer'),
        ('seller', 'Seller'),
        ('service', 'Service'),
    )

    usertype = models.CharField(max_length=20, choices=USER_TYPES, default='customer')
    userid = models.ForeignKey(User, on_delete=models.CASCADE)  # ✅ Use CustomUser

    def __str__(self):
        return self.name
    
# pets
class PetList(models.Model):
    petname = models.CharField(max_length=100) 
    petimage = models.ImageField(upload_to="pet_photos/", null=True)

    def __str__(self):
        return self.petname

class Service(models.Model):
    servicename = models.CharField(max_length=100) 
    serviceimage = models.ImageField(upload_to="service_photos/", null=True)
    def __str__(self):
        return self.servicename
    
class StoreItems(models.Model):
    itemname = models.CharField(max_length=100) 
    itemimage = models.ImageField(upload_to="item_photos/", null=True)

    def __str__(self):
        return self.itemname
    
class Doctordetails(models.Model):
    name = models.CharField(max_length=100)
    experience = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    fees = models.CharField(max_length=100, default="0")
    photo = models.ImageField(upload_to="doctor_photos/")
    remarks = models.CharField(max_length=200, blank=True, null=True)
    
    # ForeignKey to UserData, linking to users with usertype='service'
    userid = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to User model

    def __str__(self):
        return self.name

class Trainerdetails(models.Model):
    name = models.CharField(max_length=100)
    experience = models.CharField(max_length=100)
    remarks = models.CharField(max_length=200, blank=True, null=True)
    contact = models.CharField(max_length=100)
    fees = models.CharField(max_length=100, default="0")
    photo = models.ImageField(upload_to="trainer_photos/")  # Changed to ImageField
    userid = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)  # Link to User model

    def __str__(self):
        return self.name
    
class Groomingdetails(models.Model):
    name = models.CharField(max_length=100)
    duration = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True, null=True)
    price = models.CharField(max_length=100)
    products = models.CharField(max_length=200, blank=True, null=True)
    userid = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)  # Link to User model
    photo = models.ImageField(upload_to="grooming_photos/",  null=True)  # Changed to ImageField

    def __str__(self):
        return self.name
    

class FoodItem(models.Model):
    itemname = models.CharField(max_length=100)
    quantity = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    dom = models.DateField(verbose_name="Date of Manufacturing")
    doe = models.DateField(verbose_name="Date of Expiry")

    suitablefor = models.CharField(max_length=50, choices=[
        ('New born', 'New born'),
        ('Young', 'Young'),
        ('Adult', 'Adult'),
        ('All age', 'All age'),
    ])

    foodpreference = models.CharField(max_length=50, choices=[
        ('Non vegetarian', 'Non vegetarian'),
        ('Vegetarian', 'Vegetarian'),
    ])

    flavour = models.CharField(max_length=100)
    pet = models.ForeignKey('PetList', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='food_images/')
    stock = models.IntegerField(default=0)
    count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.itemname


class Medicine(models.Model):
    medicine_name = models.CharField(max_length=255)
    brand = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    dosage = models.CharField(max_length=100)
    usage_instructions = models.TextField()
    manufacture_date = models.DateField(verbose_name="Date of Manufacturing")
    expiry_date = models.DateField(verbose_name="Date of Expiry")
    pet = models.ForeignKey('PetList', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='medicine_images/')
    stock = models.IntegerField(default=0)
    count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.medicine_name
    
class Accessory(models.Model):
    accessory_name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    category = models.CharField(max_length=255, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    count = models.IntegerField(default=0)
    pet = models.ForeignKey(PetList, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='accessories')
    description = models.TextField()

    def __str__(self):
        return self.accessory_name
    

class CustomerData(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=20)
    address = models.TextField()
    gender = models.TextField(null=True)
    usertype = models.CharField(max_length=20)
    image = models.ImageField(upload_to='userPhoto/',null=True,)
    dob = models.DateField(null=True, blank=True)  # <-- Added dob field
    createdAt = models.DateTimeField(auto_now_add=True, null=True)  # <-- Added createdAt field
    userid = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name



class DoctorBooking(models.Model):
    doctorid = models.ForeignKey(Doctordetails, on_delete=models.CASCADE)  
    date = models.DateField()
    session = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default="1")
    fees = models.CharField(max_length=200)
    paymentId = models.CharField(max_length=200)
    serviceCenter = models.CharField(max_length=100, null=True)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)  

    def __str__(self):
        return self.doctorid
    
class TrainerBooking(models.Model):
    trainerid = models.ForeignKey(Trainerdetails, on_delete=models.CASCADE)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    session = models.CharField(max_length=50)
    fees = models.CharField(max_length=100)
    paymentId = models.CharField(max_length=100)
    serviceCenter = models.CharField(max_length=100)
    status = models.CharField(max_length=10, default="1")

    def __str__(self):
          return self.date
    
class PetData(models.Model):
    name = models.CharField(max_length=100)
    pet = models.ForeignKey(PetList, on_delete=models.CASCADE)
    breed = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    weight = models.CharField(max_length=20)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    age = models.CharField(max_length=100)
    dob = models.CharField(max_length=100)
    remarks = models.CharField(max_length=100)
    image = models.ImageField(upload_to='petPhoto/')

    def __str__(self):
        return self.name

class VaccineData(models.Model):
    pet = models.ForeignKey(PetData, on_delete=models.CASCADE, related_name='vaccines')
    file = models.FileField(upload_to='vaccineData/')

    def __str__(self):
        return f"Vaccine for {self.pet.name}"
    

class GroomingBooking(models.Model):
    groomingid = models.ForeignKey(Groomingdetails, on_delete=models.CASCADE)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    session = models.CharField(max_length=50)
    price = models.CharField(max_length=100)
    paymentId = models.CharField(max_length=100)
    serviceCenter = models.CharField(max_length=100)
    status = models.CharField(max_length=10, default="1")  # 1 = active, 0 = canceled, etc.

    def __str__(self):
         return self.date
    

class feedback(models.Model):
  
    email = models.CharField(max_length=50)
    fullname = models.CharField(max_length=100)
    subject = models.CharField(max_length=1000)
    message = models.CharField(max_length=100)
    status = models.CharField(max_length=10, default="0")
    reply = models.CharField(max_length=100,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    userid = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
         return self.fullname
    
class Cart(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    item = GenericForeignKey('content_type', 'object_id')
    itemcategory = models.CharField(max_length=100, null=True)
    sellerid = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    count = models.PositiveIntegerField()
    status = models.CharField(max_length=10, default="0")  # 0 = in cart, 1 = purchased
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    userid = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.item} x {self.count}"
    
    
# models.py
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_id = models.CharField(max_length=100)
    order_date = models.DateTimeField(null=True)
    status = models.CharField(max_length=20)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    item = GenericForeignKey('content_type', 'object_id')
    itemcategory = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    sellerid = models.CharField(max_length=100)
    

    def __str__(self):
        return f"{self.item} x {self.quantity}"
