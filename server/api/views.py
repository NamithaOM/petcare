from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import login_required
from django.core.files.storage import default_storage
import datetime
from django.shortcuts import get_object_or_404  # <-- Make sure this is imported
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from django.db import transaction

@csrf_exempt
def createUser(request):
    data = json.loads(request.body)

    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    contact = data.get('contact')
    usertype = data.get('usertype')

    # Check if email already exists
    if User.objects.filter(username=email).exists():
        return JsonResponse({'error': 'Email already in use'}, status=400)

    # Create CustomUser instance
    user = User.objects.create_user(username=email, email=email, password=password)

    # Create UserData instance
    user_data = UserData.objects.create(name=name, contact=contact, userid=user,usertype=usertype)

    return JsonResponse({'message': 'User created successfully', 'user_id': user.id}, status=201)

@csrf_exempt
def allusers(request):
    users = UserData.objects.exclude(usertype='Admin')
    user_list = []

    for user in users:
        user_list.append({
            'id': user.id,
            'name': user.name,
            'contact': user.contact,
            'usertype': user.usertype,
            'email': user.userid.email if user.userid else '',
            'is_active': user.userid.is_active if user.userid else 1,
        })

    return JsonResponse({'users': user_list}, status=200)

@csrf_exempt
def unblockuser(request, user_id):
    try:
        user_data = UserData.objects.get(id=user_id)
        user = user_data.userid
        user.is_active = True
        user.save()
        return JsonResponse({'message': 'User has been unblocked.'})
    except UserData.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

@csrf_exempt
def deleteuser(request, user_id):
    try:
        user_data = UserData.objects.get(id=user_id)
        user = user_data.userid
        user_data.delete()
        user.delete()
        return JsonResponse({'message': 'User deleted successfully.'})
    except UserData.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

@csrf_exempt
def blockuser(request, user_id):
    try:
        user_data = UserData.objects.get(id=user_id)
        user = user_data.userid
        user.is_active = False
        user.save()
        return JsonResponse({'message': 'User has been blocked.'})
    except UserData.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)


# Login User
@csrf_exempt
def loginUser(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"error": "Username and password required"}, status=400)

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                update_last_login(None, user)

                # First try to find usertype from CustomerData
                try:
                    customer_data = CustomerData.objects.get(userid=user)
                    usertype = customer_data.usertype.lower()

                    # Generate JWT tokens
                    refresh = RefreshToken.for_user(user)
                    access_token = refresh.access_token
                    access_token.payload['userType'] = usertype

                    return JsonResponse({
                        "message": "Login successful",
                        "token": str(access_token),
                        "user_id": user.id,
                        "userType": usertype,
                        "details": {
                            "name": customer_data.name,
                            "contact": customer_data.contact,
                            "address": customer_data.address,
                            "email": user.email
                        }
                    }, status=200)

                except CustomerData.DoesNotExist:
                    # If not a customer, fallback to UserData
                    try:
                        user_data = UserData.objects.get(userid=user)
                        usertype = user_data.usertype.lower()

                        # Generate JWT tokens
                        refresh = RefreshToken.for_user(user)
                        access_token = refresh.access_token
                        access_token.payload['userType'] = usertype

                        return JsonResponse({
                            "message": "Login successful",
                            "token": str(access_token),
                            "user_id": user.id,
                            "userType": usertype,
                            "details": {
                                "name": user_data.name,
                                "contact": user_data.contact,
                                "email": user.email
                            }
                        }, status=200)

                    except UserData.DoesNotExist:
                        return JsonResponse({"error": "User data not found"}, status=404)

            else:
                return JsonResponse({"error": "Invalid username or password"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


# Logout User
@csrf_exempt
def logoutUser(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({'message': 'Logged out successfully'}, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def create_pet(request):
    if request.method == 'POST':
        petname = request.POST.get('petname')
        petimage = request.FILES.get('petimage')  # Get uploaded image

        if not petname or not petimage:
            return JsonResponse({'error': 'Both pet name and pet image are required'}, status=400)
        
        if PetList.objects.filter(petname=petname).exists():
            return JsonResponse({'error': 'Pet already exists'}, status=400)

        pet = PetList.objects.create(petname=petname, petimage=petimage)
        return JsonResponse({'message': 'Pet created successfully', 'id': pet.id}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def update_pet(request, pet_id):
    if request.method == "POST" or request.method == "PUT":
        petname = request.POST.get('petname')
        petimage = request.FILES.get('petimage')  # Handle file upload

        try:
            pet = PetList.objects.get(id=pet_id)

            if petname:
                pet.petname = petname
            if petimage:
                pet.petimage = petimage

            pet.save()
            return JsonResponse({'message': 'Pet updated successfully'})

        except PetList.DoesNotExist:
            return JsonResponse({'error': 'Pet not found'}, status=404)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def delete_pet(request, pet_id):
    try:
        pet = PetList.objects.get(id=pet_id)
        pet.delete()
        return JsonResponse({'message': 'Pet deleted successfully'})

    except PetList.DoesNotExist:
        return JsonResponse({'error': 'Pet not found'}, status=404)

@csrf_exempt
def list_pets(request):
    pets = list(PetList.objects.values())  
    return JsonResponse({'pets': pets}, safe=False)


@csrf_exempt
def create_service(request):
    if request.method == 'POST':
        servicename = request.POST.get('servicename')
        serviceimage = request.FILES.get('serviceimage')

        if Service.objects.filter(servicename=servicename).exists():
            return JsonResponse({'error': 'Service already exists'}, status=400)

        service = Service.objects.create(servicename=servicename, serviceimage=serviceimage)
        return JsonResponse({'message': 'Service created successfully', 'id': service.id}, status=201)

@csrf_exempt
def update_servicename(request, service_id):
    if request.method == 'POST':
        servicename = request.POST.get('servicename')
        serviceimage = request.FILES.get('serviceimage')

        try:
            service = Service.objects.get(id=service_id)
            service.servicename = servicename
            if serviceimage:
                service.serviceimage = serviceimage
            service.save()
            return JsonResponse({'message': 'Service updated successfully'})
        except Service.DoesNotExist:
            return JsonResponse({'error': 'Service not found'}, status=404)
@csrf_exempt
def delete_servicename(request, service_id):  # Accept service_id as a parameter
    try:
        service = Service.objects.get(id=service_id)  # Use service_id
        service.delete()
        return JsonResponse({'message': 'Service deleted successfully'})

    except Service.DoesNotExist:
        return JsonResponse({'error': 'Service not found'}, status=404)

@csrf_exempt
def list_servicename(request):
    services = list(Service.objects.values())
    return JsonResponse({'servicename': services}, safe=False)

@csrf_exempt
def create_Item(request):
    if request.method == 'POST':
        itemname = request.POST.get('itemname')
        itemimage = request.FILES.get('itemimage')

        if StoreItems.objects.filter(itemname=itemname).exists():
            return JsonResponse({'error': 'Item already exists'}, status=400)

        item = StoreItems.objects.create(itemname=itemname, itemimage=itemimage)
        return JsonResponse({'message': 'Item created successfully', 'id': item.id}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def update_Item(request, item_id):
    if request.method == 'POST':
        try:
            item = StoreItems.objects.get(id=item_id)
        except StoreItems.DoesNotExist:
            return JsonResponse({'error': 'Item not found'}, status=404)

        itemname = request.POST.get('itemname')
        itemimage = request.FILES.get('itemimage')

        if itemname:
            item.itemname = itemname
        if itemimage:
            item.itemimage = itemimage

        item.save()
        return JsonResponse({'message': 'Item updated successfully'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def list_Item(request):
    items = list(StoreItems.objects.values())
    return JsonResponse({'StoreItems': items}, safe=False)


@csrf_exempt
def delete_Item(request, item_id):  # Accept item_id as a parameter
    try:
        item = StoreItems.objects.get(id=item_id)  # Use item_id
        item.delete()
        return JsonResponse({'message': 'item deleted successfully'})

    except StoreItems.DoesNotExist:
        return JsonResponse({'error': 'item not found'}, status=404)


@csrf_exempt
def create_doctor(request):
    if request.method == "POST":
        try:
            name = request.POST.get("name")
            experience = request.POST.get("experience")
            qualification = request.POST.get("qualification")
            contact = request.POST.get("contact")
            remarks = request.POST.get("remarks")
            photo = request.FILES.get("photo")
            fees = request.POST.get("fees")
            userid = request.POST.get("userid")  # Get userid from frontend
            
            user = User.objects.get(id=userid)  # Retrieve the user
            
            doctor = Doctordetails.objects.create(
                name=name,
                experience=experience,
                qualification=qualification,
                contact=contact,
                photo=photo,
                fees=fees,
                remarks=remarks,
                userid=user  # Assign user ID
            )
            
            return JsonResponse({"message": "Doctor added successfully"}, status=201)
        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid user ID"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

# for user view

@csrf_exempt
def allDoctors(request):
    try:
        doctor_list = []

        doctors = Doctordetails.objects.select_related('userid').all()
        for doc in doctors:
            user_data = UserData.objects.filter(userid=doc.userid).first()

            doctor_list.append({
                "id": doc.id,
                "name": doc.name,
                "experience": doc.experience,
                "qualification": doc.qualification,
                "contact": doc.contact,
                "fees": doc.fees,
                "photo": doc.photo.url if doc.photo else "",
                "remarks": doc.remarks,
                "company_name": user_data.name if user_data else "",  # Get user name from UserData
            })

        return JsonResponse({'Doctors': doctor_list}, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@csrf_exempt
def deleteDoctor(request, doctor_id):
    if request.method == 'DELETE':
        try:
            doctor = Doctordetails.objects.get(id=doctor_id)
            doctor.delete()
            return JsonResponse({'message': 'Doctor deleted successfully.'})
        except Doctordetails.DoesNotExist:
            return JsonResponse({'error': 'Doctor not found.'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)

@csrf_exempt
def list_doctors(request):
    if request.method == "GET":
        try:
            user_id = request.GET.get("id")
            if not user_id:
                return JsonResponse({"error": "User ID is required"}, status=400)

            doctors = Doctordetails.objects.filter(userid__id=user_id)
            doctor_list = [
                {
                    "id": doctor.id,
                    "name": doctor.name,
                    "experience": doctor.experience,
                    "qualification": doctor.qualification,
                    "contact": doctor.contact,
                    "fees": doctor.fees,
                    "remarks": doctor.remarks,
                    "photo": request.build_absolute_uri(doctor.photo.url) if doctor.photo else None,
                }
                for doctor in doctors
            ]
            return JsonResponse(doctor_list, safe=False, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def view_doctor(request, id):
    try:
        doctor = Doctordetails.objects.get(id=id)
        return JsonResponse({
            "name": doctor.name,
            "experience": doctor.experience,
            "qualification": doctor.qualification,
            "contact": doctor.contact,
            "remarks": doctor.remarks,
            "fees": doctor.fees,
            "photo": request.build_absolute_uri(doctor.photo.url) if doctor.photo else None,

        })
    except Doctordetails.DoesNotExist:
        return JsonResponse({"error": "Doctor not found"}, status=404)

@csrf_exempt
def edit_doctor(request, id):
    try:
        doctor = Doctordetails.objects.get(id=id)

        if request.method == "GET":
            return JsonResponse({
                "name": doctor.name,
                "experience": doctor.experience,
                "qualification": doctor.qualification,
                "contact": doctor.contact,
                "remarks": doctor.remarks,
                "fees": doctor.fees,
                "photo": doctor.photo.url if doctor.photo else "",
            })

        elif request.method == "POST":
            doctor.name = request.POST.get("name")
            doctor.experience = request.POST.get("experience")
            doctor.qualification = request.POST.get("qualification")
            doctor.contact = request.POST.get("contact")
            doctor.remarks = request.POST.get("remarks")
            doctor.fees = request.POST.get("fees")

            # Check if a new photo is uploaded
            if "photo" in request.FILES:
                if doctor.photo:
                    default_storage.delete(doctor.photo.path)  # Delete old photo
                doctor.photo = request.FILES["photo"]

            doctor.save()
            return JsonResponse({"message": "Doctor updated successfully", "photo": doctor.photo.url if doctor.photo else ""})

    except Doctordetails.DoesNotExist:
        return JsonResponse({"error": "Doctor not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@csrf_exempt
def delete_doctor(request, id):
    try:
        doctor = Doctordetails.objects.get(id=id)
        doctor.delete()
        return JsonResponse({"message": "Doctor deleted successfully"})
    except Doctordetails.DoesNotExist:
        return JsonResponse({"error": "Doctor not found"}, status=404)


@csrf_exempt
def create_Trainer(request):
    if request.method == "POST":
        try:
            name = request.POST.get("name")
            experience = request.POST.get("experience")
            contact = request.POST.get("contact")
            remarks = request.POST.get("remarks")
            photo = request.FILES.get("photo")
            fees = request.POST.get("fees")
            userid = request.POST.get("userid")  # Get userid from frontend
            
            user = User.objects.get(id=userid)  # Retrieve the user
            
            trainer = Trainerdetails.objects.create(
                name=name,
                experience=experience,
                contact=contact,
                photo=photo,
                fees=fees,
                remarks=remarks,
                userid=user  # Assign user ID
            )
            
            return JsonResponse({"message": "Trainerdetails added successfully"}, status=201)
        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid user ID"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


# for user view

@csrf_exempt
def alltrainers(request):
    trainers = Trainerdetails.objects.select_related('userid')  # Ensure we can access related user
    data = []

    for trainer in trainers:
        user_data = UserData.objects.filter(userid=trainer.userid).first()
        data.append({
            "id": trainer.id,
            "name": trainer.name,
            "experience": trainer.experience,
            "remarks": trainer.remarks,
            "contact": trainer.contact,
            "fees": trainer.fees,
            "photo": trainer.photo.url if trainer.photo else "",
            "serviceCenter": user_data.name if user_data else "",
        })

    return JsonResponse({'Trainers': data}, safe=False)


@csrf_exempt
def deleteTrainer(request, trainer_id):
    if request.method == 'DELETE':
        try:
            trainer = Trainerdetails.objects.get(id=trainer_id)
            trainer.delete()
            return JsonResponse({'message': 'Trainer deleted successfully.'})
        except Trainerdetails.DoesNotExist:
            return JsonResponse({'error': 'Trainer not found.'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)

@csrf_exempt
def view_trainers_by_user(request, userid):
    if request.method == "GET":
        try:
            trainers = Trainerdetails.objects.filter(userid__id=userid)
            data = [
                {
                    "id": trainer.id,
                    "name": trainer.name,
                    "experience": trainer.experience,
                    "contact": trainer.contact,
                    "remarks": trainer.remarks,
                    "fees": trainer.fees,
                    # Return only the relative path without MEDIA_URL prefix
                    "photo": trainer.photo.name if trainer.photo else None,
                }
                for trainer in trainers
            ]
            return JsonResponse(data, safe=False, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def view_Trainer(request, id):
    try:
        trainer = Trainerdetails.objects.get(id=id)
        trainer_data = {
            "id": trainer.id,
            "name": trainer.name,
            "experience": trainer.experience,
            "contact": trainer.contact,
            "remarks": trainer.remarks,
            "fees": trainer.fees,
            "photo": trainer.photo.url.lstrip("/") if trainer.photo else None,
            "userid": trainer.userid.id
        }
        return JsonResponse(trainer_data, status=200)
    except Trainerdetails.DoesNotExist:
        return JsonResponse({"error": "Trainer not found"}, status=404)

@csrf_exempt
def edit_Trainer(request, id):
    if request.method == "POST":
        try:
            trainer = Trainerdetails.objects.get(id=id)
            trainer.name = request.POST.get("name", trainer.name)
            trainer.experience = request.POST.get("experience", trainer.experience)
            trainer.contact = request.POST.get("contact", trainer.contact)
            trainer.remarks = request.POST.get("remarks", trainer.remarks)
            trainer.fees = request.POST.get("fees", trainer.fees)

            if "photo" in request.FILES:
                if trainer.photo:
                    trainer.photo.delete()
                trainer.photo = request.FILES["photo"]

            trainer.save()
            return JsonResponse({"message": "Trainer updated successfully"}, status=200)
        except Trainerdetails.DoesNotExist:
            return JsonResponse({"error": "Trainer not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def delete_Trainer(request, id):
    if request.method == "DELETE":
        try:
            trainer = Trainerdetails.objects.get(id=id)
            trainer.delete()
            return JsonResponse({"message": "Trainer deleted successfully"}, status=200)
        except Trainerdetails.DoesNotExist:
            return JsonResponse({"error": "Trainer not found"}, status=404)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def create_Grooming(request):
    if request.method == "POST":
        try:
            name = request.POST.get("name")
            duration = request.POST.get("duration")
            description = request.POST.get("description")
            price = request.POST.get("price")
            products = request.POST.get("products")
            userid = request.POST.get("userid")  # Get userid from frontend
            photo = request.FILES.get("photo")
            user = User.objects.get(id=userid)  # Retrieve the user
            
            grooming = Groomingdetails.objects.create(
                name=name,
                duration=duration,
                description=description,
                products=products,
                price=price,
                photo=photo,
                userid=user  # Assign user ID
            )
            
            return JsonResponse({"message": "groomingdetails added successfully"}, status=201)
        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid user ID"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


# for user view

@csrf_exempt
def allgrooming(request):
    grooming_entries = Groomingdetails.objects.select_related('userid')
    data = []

    for entry in grooming_entries:
        user_data = UserData.objects.filter(userid=entry.userid).first()
        data.append({
            "id": entry.id,
            "name": entry.name,
            "duration": entry.duration,
            "description": entry.description,
            "price": entry.price,
            "products": entry.products,
            "photo": entry.photo.url if entry.photo else "",
            "serviceCenter": user_data.name if user_data else "",
        })

    return JsonResponse({'Groomings': data}, safe=False)

@csrf_exempt
def list_Grooming(request):
    if request.method == "GET":
        try:
            user_id = request.GET.get("id")
            if not user_id:
                return JsonResponse({"error": "User ID is required"}, status=400)

            grooming_list = []
            groomings = Groomingdetails.objects.filter(userid__id=user_id)

            for grooming in groomings:
                grooming_data = {
                    "id": grooming.id,
                    "name": grooming.name,
                    "duration": grooming.duration,
                    "description": grooming.description,
                    "price": grooming.price,
                    "products": grooming.products,
                    "userid": grooming.userid.id if grooming.userid else None,
                    "photo": request.build_absolute_uri(grooming.photo.url) if grooming.photo else None
                }
                grooming_list.append(grooming_data)

            return JsonResponse({"groomings": grooming_list}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def view_grooming(request, id):
    if request.method == "GET":
        try:
            grooming = Groomingdetails.objects.get(id=id)
            return JsonResponse({
                "id": grooming.id,
                "name": grooming.name,
                "duration": grooming.duration,
                "description": grooming.description,
                "price": grooming.price,
                "products": grooming.products,
                "photo": grooming.photo.url.lstrip("/") if grooming.photo else None,
            }, status=200)  # Return a single object instead of a list
        except Groomingdetails.DoesNotExist:
            return JsonResponse({"error": "Grooming not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def delete_grooming(request, id):
    if request.method == "DELETE":
        try:
            grooming = Groomingdetails.objects.get(id=id)
            grooming.delete()
            return JsonResponse({"message": "Grooming deleted successfully"}, status=200)
        except Groomingdetails.DoesNotExist:
            return JsonResponse({"error": "Grooming not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def update_Grooming(request, id):
    if request.method == "POST":
        try:
            grooming = Groomingdetails.objects.get(id=id)

            # Get form data
            name = request.POST.get("name", grooming.name)
            description = request.POST.get("description", grooming.description)
            duration = request.POST.get("duration", grooming.duration)
            price = request.POST.get("price", grooming.price)
            products = request.POST.get("products", grooming.products)
            photo = request.FILES.get("image")  # Make sure to get 'image' as the file input name

            # Update fields
            grooming.name = name
            grooming.description = description
            grooming.duration = duration
            grooming.price = price
            grooming.products = products

            if photo:  # Only update photo if there's a new one
                grooming.photo = photo

            grooming.save()

            return JsonResponse({"message": "Grooming details updated successfully"}, status=200)

        except Groomingdetails.DoesNotExist:
            return JsonResponse({"error": "Grooming not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def create_food(request):
    if request.method == "POST":
        try:
            itemname = request.POST.get("itemname")
            quantity = request.POST.get("quantity")
            price = request.POST.get("price")
            stock = request.POST.get("stock")
            count = request.POST.get("count")
            dom = request.POST.get("dom")  # Format: YYYY-MM-DD
            doe = request.POST.get("doe")
            suitablefor = request.POST.get("suitablefor")
            foodpreference = request.POST.get("foodpreference")
            flavour = request.POST.get("flavour")
            petid = request.POST.get("petid")
            userid = request.POST.get("userid")
            image = request.FILES.get("image")

            # Validate required fields
            if not all([itemname, quantity, price, dom, doe, suitablefor, foodpreference, flavour, petid, userid, image]):
                return JsonResponse({"error": "Missing required fields"}, status=400)

            user = User.objects.get(id=userid)
            pet = PetList.objects.get(id=petid)

            food = FoodItem.objects.create(
                itemname=itemname,
                quantity=quantity,
                price=price,
                stock=stock,
                count=count,
                dom=datetime.datetime.strptime(dom, '%Y-%m-%d').date(),
                doe=datetime.datetime.strptime(doe, '%Y-%m-%d').date(),
                suitablefor=suitablefor,
                foodpreference=foodpreference,
                flavour=flavour,
                pet=pet,
                user=user,
                image=image
            )

            return JsonResponse({"message": "Food added successfully"}, status=201)

        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid user ID"}, status=400)
        except PetList.DoesNotExist:
            return JsonResponse({"error": "Invalid pet ID"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

# for user view

@csrf_exempt
def allfood(request):
    foods = FoodItem.objects.select_related('pet', 'user').all()

    food_list = []
    for food in foods:
        # Get related user data from UserData table
        try:
            user_data = UserData.objects.get(userid=food.user)
            user_name = user_data.name
            user_contact = user_data.contact
        except UserData.DoesNotExist:
            user_name = None
            user_contact = None

        food_list.append({
            "id": food.id,
            "itemname": food.itemname,
            "quantity": food.quantity,
            "price": float(food.price),
            "stock": food.stock,
            "count": food.count,
            "dom": food.dom.strftime("%Y-%m-%d"),
            "doe": food.doe.strftime("%Y-%m-%d"),
            "suitablefor": food.suitablefor,
            "foodpreference": food.foodpreference,
            "flavour": food.flavour,
            "image": food.image.url if food.image else None,
            "pet_id": food.pet.id,
            "pet_name": food.pet.petname,
            "sellerId": food.user.id,
            "user_name": user_name,
            "user_contact": user_contact
        })

    return JsonResponse({'Food': food_list}, safe=False)

@csrf_exempt
def view_food_by_user(request, userid):
    if request.method == "GET":
        try:
            foods = FoodItem.objects.filter(user_id=userid)
            food_list = [
                {
                    "id": food.id,
                    "itemname": food.itemname,
                    "quantity": food.quantity,
                    "stock": food.stock,
                    "count": food.count,
                    "price": float(food.price),
                    "dom": food.dom.strftime("%Y-%m-%d"),
                    "doe": food.doe.strftime("%Y-%m-%d"),
                    "suitablefor": food.suitablefor,
                    "foodpreference": food.foodpreference,
                    "flavour": food.flavour,
                    "petid": food.pet.id,
                    "image": food.image.url if food.image else "",
                }
                for food in foods
            ]
            return JsonResponse({"foods": food_list}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)



@csrf_exempt
def get_food_item(request, foodid):
    if request.method == "GET":
        try:
            food = FoodItem.objects.get(id=foodid)
            data = {
                "id": food.id,
                "itemname": food.itemname,
                "quantity": food.quantity,
                "price": float(food.price),
                "stock": food.stock,
                "count": food.count,
                "dom": food.dom.strftime("%Y-%m-%d"),
                "doe": food.doe.strftime("%Y-%m-%d"),
                "suitablefor": food.suitablefor,
                "foodpreference": food.foodpreference,
                "flavour": food.flavour,
                "petid": food.pet.id,
                "userid": food.user.id,
                "image": food.image.url if food.image else "",
            }
            return JsonResponse(data, status=200)
        except FoodItem.DoesNotExist:
            return JsonResponse({"error": "Food item not found"}, status=404)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def edit_food_item(request, foodid):
    if request.method == "POST":
        try:
            food = FoodItem.objects.get(id=foodid)

            # Update only if provided
            food.itemname = request.POST.get("itemname", food.itemname)
            food.quantity = request.POST.get("quantity", food.quantity)
            food.price = request.POST.get("price", food.price)
            food.stock = request.POST.get("stock", food.stock)
            food.count = request.POST.get("count", food.count)
            dom = request.POST.get("dom")
            doe = request.POST.get("doe")

            if dom:
                food.dom = datetime.datetime.strptime(dom, '%Y-%m-%d').date()
            if doe:
                food.doe = datetime.datetime.strptime(doe, '%Y-%m-%d').date()

            food.suitablefor = request.POST.get("suitablefor", food.suitablefor)
            food.foodpreference = request.POST.get("foodpreference", food.foodpreference)
            food.flavour = request.POST.get("flavour", food.flavour)

            petid = request.POST.get("petid")
            userid = request.POST.get("userid")
            image = request.FILES.get("image")

            if petid:
                food.pet = PetList.objects.get(id=petid)
            if userid:
                food.user = User.objects.get(id=userid)
            if image:
                food.image = image

            food.save()
            # return JsonResponse({"message": "Food item updated successfully"}, status=200)
            return JsonResponse({"success": True, "message": "Food item updated successfully"}, status=200)

        except FoodItem.DoesNotExist:
            return JsonResponse({"error": "Food item not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def delete_food_item(request, foodid):
    if request.method == "DELETE":
        try:
            food = FoodItem.objects.get(id=foodid)
            food.delete()
            return JsonResponse({"message": "Food item deleted successfully"}, status=200)
        except FoodItem.DoesNotExist:
            return JsonResponse({"error": "Food item not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=405)



@csrf_exempt
def create_medicine(request):
    if request.method == "POST":
        try:
            medicine_name = request.POST.get("medicineName")
            brand = request.POST.get("brand")
            price = request.POST.get("price")
            stock = request.POST.get("stock")
            count = request.POST.get("count")
            dosage = request.POST.get("dosage")
            usage_instructions = request.POST.get("usageInstructions")
            manufacture_date = request.POST.get("manufactureDate")
            expiry_date = request.POST.get("expiryDate")
            petid = request.POST.get("petid")
            userid = request.POST.get("userid")
            image = request.FILES.get("image")

            # Validate required fields
            if not all([medicine_name, brand, price, stock, dosage, usage_instructions, manufacture_date, expiry_date, petid, userid, image]):
                return JsonResponse({"error": "Missing required fields"}, status=400)

            user = User.objects.get(id=userid)
            pet = PetList.objects.get(id=petid)

            medicine = Medicine.objects.create(
                medicine_name=medicine_name,
                brand=brand,
                price=price,
                stock=stock,
                count=count,
                dosage=dosage,
                usage_instructions=usage_instructions,
                manufacture_date=datetime.datetime.strptime(manufacture_date, '%Y-%m-%d').date(),
                expiry_date=datetime.datetime.strptime(expiry_date, '%Y-%m-%d').date(),
                pet=pet,
                user=user,
                image=image
            )

            return JsonResponse({"message": "Medicine added successfully"}, status=201)
        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid user ID"}, status=400)
        except PetList.DoesNotExist:
            return JsonResponse({"error": "Invalid pet ID"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)

# for user view

@csrf_exempt
def allmedicine(request):
    medicines = Medicine.objects.select_related('pet', 'user').all()
    
    medicine_list = []
    for med in medicines:
        # Get related user data from UserData table
        try:
            user_data = UserData.objects.get(userid=med.user)
            user_name = user_data.name
            user_contact = user_data.contact
        except UserData.DoesNotExist:
            user_name = None
            user_contact = None

        medicine_list.append({
            "id": med.id,
            "medicine_name": med.medicine_name,
            "brand": med.brand,
            "price": float(med.price),
            "dosage": med.dosage,
            "usage_instructions": med.usage_instructions,
            "manufacture_date": med.manufacture_date.strftime("%Y-%m-%d"),
            "expiry_date": med.expiry_date.strftime("%Y-%m-%d"),
            "stock": med.stock,
            "count": med.count,
            "image": med.image.url if med.image else None,
            "pet_id": med.pet.id,
            "pet_name": med.pet.petname,
            "selerId": med.user.id,
            "user_name": user_name,           # from UserData.name
            "user_contact": user_contact      # from UserData.contact
        })

    return JsonResponse({'Medicine': medicine_list}, safe=False)


@csrf_exempt
def view_medicine_by_user(request, userid):
    if request.method == "GET":
        try:
            medicines = Medicine.objects.filter(user_id=userid)
            medicine_list = [
                {
                    "id": medicine.id,
                    "medicine_name": medicine.medicine_name,
                    "brand": medicine.brand,
                    "price": float(medicine.price),
                    "stock": medicine.stock,
                    "count": medicine.count,
                    "dosage": medicine.dosage,
                    "usage_instructions": medicine.usage_instructions,
                    "manufacture_date": medicine.manufacture_date.strftime("%Y-%m-%d"),
                    "expiry_date": medicine.expiry_date.strftime("%Y-%m-%d"),
                    "petid": medicine.pet.id,
                    "image": medicine.image.url if medicine.image else "",
                }
                for medicine in medicines
            ]
            return JsonResponse({"medicines": medicine_list}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def get_medicine_item(request, medicineid):
    if request.method == "GET":
        try:
            medicine = Medicine.objects.get(id=medicineid)
            data = {
                "id": medicine.id,
                "medicine_name": medicine.medicine_name,
                "brand": medicine.brand,
                "price": float(medicine.price),
                "stock": medicine.stock,
                "count": medicine.count,
                "dosage": medicine.dosage,
                "usage_instructions": medicine.usage_instructions,
                "manufacture_date": medicine.manufacture_date.strftime("%Y-%m-%d"),
                "expiry_date": medicine.expiry_date.strftime("%Y-%m-%d"),
                "petid": medicine.pet.id,
                "userid": medicine.user.id,
                "image": medicine.image.url if medicine.image else "",
            }
            return JsonResponse(data, status=200)
        except Medicine.DoesNotExist:
            return JsonResponse({"error": "Medicine not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def edit_medicine_item(request, medicineid):
    if request.method == "POST":
        try:
            medicine = Medicine.objects.get(id=medicineid)
            medicine.medicine_name = request.POST.get("medicine_name", medicine.medicine_name)
            medicine.brand = request.POST.get("brand", medicine.brand)
            medicine.price = request.POST.get("price", medicine.price)
            medicine.stock = request.POST.get("stock", medicine.stock)
            medicine.count = request.POST.get("count", medicine.count)
            medicine.dosage = request.POST.get("dosage", medicine.dosage)
            medicine.usage_instructions = request.POST.get("usage_instructions", medicine.usage_instructions)
            manufacture_date = request.POST.get("manufacture_date")
            expiry_date = request.POST.get("expiry_date")
            if manufacture_date:
                medicine.manufacture_date = datetime.datetime.strptime(manufacture_date, '%Y-%m-%d').date()
            if expiry_date:
                medicine.expiry_date = datetime.datetime.strptime(expiry_date, '%Y-%m-%d').date()
            petid = request.POST.get("petid")
            userid = request.POST.get("userid")
            image = request.FILES.get("image")
            if petid:
                medicine.pet = PetList.objects.get(id=petid)
            if userid:
                medicine.user = User.objects.get(id=userid)
            if image:
                medicine.image = image
            medicine.save()
            return JsonResponse({"success": True, "message": "Medicine updated successfully"}, status=200)
        except Medicine.DoesNotExist:
            return JsonResponse({"error": "Medicine not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def delete_medicine_item(request, medicineid):
    if request.method == "DELETE":
        try:
            medicine = Medicine.objects.get(id=medicineid)
            medicine.delete()
            return JsonResponse({"message": "Medicine deleted successfully"}, status=200)
        except Medicine.DoesNotExist:
            return JsonResponse({"error": "Medicine not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=405)



@csrf_exempt
def create_accessory(request):
    if request.method == "POST":
        try:
            accessory_name = request.POST.get("accessoryName")
            brand = request.POST.get("brand")
            price = request.POST.get("price")
            stock = request.POST.get("stock")
            petid = request.POST.get("petid")
            userid = request.POST.get("userid")
            image = request.FILES.get("image")
            category = request.POST.get("category") 
            description = request.POST.get("description")

            if not all([accessory_name, brand, price, stock, petid, userid, image, description]):
                return JsonResponse({"error": "Missing required fields"}, status=400)

            user = User.objects.get(id=userid)
            pet = PetList.objects.get(id=petid)

            accessory = Accessory.objects.create(
                accessory_name=accessory_name,
                brand=brand,
                price=price,
                stock=stock,
                count=stock,
                category=category,
                pet=pet,
                user=user,
                image=image,
                description=description
            )

            return JsonResponse({"message": "Accessory added successfully"}, status=201)
        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid user ID"}, status=400)
        except PetList.DoesNotExist:
            return JsonResponse({"error": "Invalid pet ID"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)

# for user view
@csrf_exempt
def allaccessory(request):
    if request.method == "GET":
        accessories = Accessory.objects.select_related('pet', 'user').all()

        accessory_list = []
        for acc in accessories:
            try:
                user_data = UserData.objects.get(userid=acc.user)
                user_name = user_data.name
                user_contact = user_data.contact
            except UserData.DoesNotExist:
                user_name = None
                user_contact = None

            accessory_list.append({
                "id": acc.id,
                "accessory_name": acc.accessory_name,
                "brand": acc.brand,
                "price": float(acc.price),
                "stock": acc.stock,
                "count": acc.count,
                "category":acc.category,
                "description": acc.description,
                "image": acc.image.url if acc.image else None,
                "pet_id": acc.pet.id,
                "pet_name": acc.pet.petname,
                "sellerId": acc.user.id,
                "user_name": user_name,
                "user_contact": user_contact
            })

        return JsonResponse({'Accessory': accessory_list}, safe=False)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def delete_accessory(request, accessoryid):
    if request.method == "DELETE":
        try:
            accessory = Accessory.objects.get(id=accessoryid)
            accessory.delete()
            return JsonResponse({"message": "Accessory deleted successfully"}, status=200)
        except Accessory.DoesNotExist:
            return JsonResponse({"error": "Accessory not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def view_accessories_by_user(request, userid):
    if request.method == "GET":
        try:
            accessories = Accessory.objects.filter(user_id=userid)
            accessory_list = [
                {
                    "id": accessory.id,
                    "accessory_name": accessory.accessory_name,
                    "brand": accessory.brand,
                    "category":accessory.category,
                    "price": float(accessory.price),
                    "stock": accessory.stock,
                    "description": accessory.description,
                    "image": accessory.image.url if accessory.image else "",
                }
                for accessory in accessories
            ]
            return JsonResponse({"accessories": accessory_list}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)



@csrf_exempt
def get_accessory(request, accessoryid):
    if request.method == "GET":
        try:
            accessory = Accessory.objects.get(id=accessoryid)
            data = {
                "id": accessory.id,
                "accessory_name": accessory.accessory_name,
                "brand": accessory.brand,
                "price": float(accessory.price),
                "stock": accessory.stock,
                "category": accessory.category,
                "description": accessory.description,
                "petid": accessory.pet.id,
                "userid": accessory.user.id,
                "image": accessory.image.url if accessory.image else "",
            }
            return JsonResponse(data, status=200)
        except Accessory.DoesNotExist:
            return JsonResponse({"error": "Accessory not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def edit_accessory(request, accessoryid):
    if request.method == "POST":
        try:
            accessory = Accessory.objects.get(id=accessoryid)
            accessory.accessory_name = request.POST.get("accessory_name", accessory.accessory_name)
            accessory.brand = request.POST.get("brand", accessory.brand)
            accessory.category = request.POST.get("category", accessory.category)
            accessory.price = request.POST.get("price", accessory.price)
            accessory.stock = request.POST.get("stock", accessory.stock)
            accessory.description = request.POST.get("description", accessory.description)
            petid = request.POST.get("petid")
            userid = request.POST.get("userid")
            image = request.FILES.get("image")
            if petid:
                accessory.pet = PetList.objects.get(id=petid)
            if userid:
                accessory.user = User.objects.get(id=userid)
            if image:
                accessory.image = image
            accessory.save()
            return JsonResponse({"success": True, "message": "Accessory updated successfully"}, status=200)
        except Accessory.DoesNotExist:
            return JsonResponse({"error": "Accessory not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def createCustomer(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            email = data.get('email')
            password = data.get('password')
            name = data.get('name')
            contact = data.get('contact')
            address = data.get('address')  # captured from frontend
            usertype = data.get('usertype', 'customer')  # default fallback

            if not all([email, password, name, contact, address]):
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            # Check if email already exists
            if User.objects.filter(username=email).exists():
                return JsonResponse({'error': 'Email already in use'}, status=400)

            # Create Django User
            user = User.objects.create_user(username=email, email=email, password=password)

            # Create associated user profile
            user_data = CustomerData.objects.create(
                name=name,
                contact=contact,
                address=address,  # make sure your CustomerData model has this field
                userid=user,
                usertype=usertype
            )

            return JsonResponse({'message': 'User registered successfully', 'user_id': user.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f"An error occurred: {str(e)}"}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def getCustomerProfile(request, user_id):
    if request.method == 'GET':
        try:
            customer = CustomerData.objects.get(userid=user_id)
            profile_data = {
                'id': customer.id,
                'name': customer.name,
                'gender': customer.gender,
                'contact': customer.contact,
                'address': customer.address,
                'usertype': customer.usertype,
                'dob': customer.dob.strftime('%Y-%m-%d') if customer.dob else None,  # format dob nicely
                'createdAt': customer.createdAt.strftime('%Y-%m-%d %H:%M:%S') if customer.createdAt else None,
                'image_url': customer.image.url if customer.image else None,
            }
            return JsonResponse({'profile': profile_data}, status=200)
        except CustomerData.DoesNotExist:
            return JsonResponse({'error': 'Profile not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def updateCustomerProfile(request, user_id):
    if request.method == 'POST':
        try:
            customer = CustomerData.objects.get(userid=user_id)

            customer.name = request.POST.get('name', customer.name)
            customer.gender = request.POST.get('gender', customer.gender)
            customer.contact = request.POST.get('contact', customer.contact)
            customer.address = request.POST.get('address', customer.address)
            dob = request.POST.get('dob')
            if dob:
                customer.dob = dob

            if 'image' in request.FILES:
                customer.image = request.FILES['image']

            customer.save()

            return JsonResponse({'message': 'Profile updated successfully'}, status=200)

        except CustomerData.DoesNotExist:
            return JsonResponse({'error': 'Profile not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



@csrf_exempt
def check_doctor_booking_availability(request):
    try:
        data = json.loads(request.body)
        doctor_id = data.get("doctorid")
        date = data.get("date")
        session = data.get("session")

        if not all([doctor_id, date, session]):
            return JsonResponse({"error": "Missing required fields"}, status=400)

        doctor = Doctordetails.objects.get(id=doctor_id)
        existing_booking = DoctorBooking.objects.filter(
            doctorid=doctor, date=date, session=session, status="1"
        ).exists()

        if existing_booking:
            return JsonResponse({
                "available": False,
                "message": "Booking already completed for this date and session. Please try another date."
            }, status=200)

        return JsonResponse({"available": True}, status=200)

    except Doctordetails.DoesNotExist:
        return JsonResponse({"error": "Doctor not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def create_doctor_booking(request):
    try:
        data = json.loads(request.body)

        doctor_id = data.get("doctorid")
        user_id = data.get("userid")
        date = data.get("date")
        session = data.get("session")
        fees = data.get("fees")
        payment_id = data.get("paymentId")
        service_center = data.get("serviceCenter")

        # Validate required fields
        if not all([doctor_id, user_id, date, session, fees, payment_id]):
            return JsonResponse({"error": "All fields are required"}, status=400)

        # Fetch doctor and user
        doctor = Doctordetails.objects.get(id=doctor_id)
        user = User.objects.get(id=user_id)

        # Check for existing booking with same doctor, date and session
        existing_booking = DoctorBooking.objects.filter(
            doctorid=doctor, date=date, session=session, status="1"
        ).exists()

        if existing_booking:
            return JsonResponse(
                {"message": "Booking already completed for this date and session. Please try another session."},
                status=409
            )

        # Create new booking
        booking = DoctorBooking.objects.create(
            doctorid=doctor,
            userid=user,
            date=date,
            session=session,
            fees=fees,
            paymentId=payment_id,
            serviceCenter=service_center,
            status="1"
        )

        return JsonResponse({"message": "Doctor booking successful", "booking_id": booking.id}, status=201)

    except Doctordetails.DoesNotExist:
        return JsonResponse({"error": "Doctor not found"}, status=404)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@csrf_exempt
def add_pet(request):
    if request.method == "POST":
        try:
            name = request.POST.get("name")
            pet = request.POST.get("pet")
            breed = request.POST.get("breed")
            gender = request.POST.get("gender")
            dob = request.POST.get("dob")
            age = request.POST.get("age")
            weight = request.POST.get("weight")
            remarks = request.POST.get("remarks")
            userid = request.POST.get("userid")

            image = request.FILES.get("image")
            vaccine_files = request.FILES.getlist("vaccinedata")

            # Validate required fields
            if not all([name, pet, breed, gender, dob, age, weight, userid, image]):
                return JsonResponse({"error": "Missing required fields"}, status=400)

            user = User.objects.get(id=userid)
            pet_instance = PetList.objects.get(id=pet)

            # Save PetData instance
            pet_data_instance = PetData.objects.create(
                name=name,
                pet=pet_instance,
                breed=breed,
                gender=gender,
                dob=dob,
                age=age,
                weight=weight,
                remarks=remarks,
                userid=user,
                image=image
            )

            # Save vaccine files in VaccineData model and associate them with the PetData instance
            for file in vaccine_files:
                vaccine_data_instance = VaccineData.objects.create(
                    pet=pet_data_instance,  # Associate with PetData instance
                    file=file  # Save the file
                )

            return JsonResponse({"message": "Pet added successfully!"}, status=201)

        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid user ID"}, status=400)
        except PetList.DoesNotExist:
            return JsonResponse({"error": "Invalid pet ID"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


def view_pet_profile(request, user_id):
    try:
        # Fetch pets for the specific user
        pets = PetData.objects.filter(userid=user_id)

        if not pets:
            return JsonResponse({"error": "No pets found for this user"}, status=404)

        # Prepare pet data
        pets_data = [
            {
                'id': pet.id,
                'name': pet.name,
                'breed': pet.breed,
                'gender': pet.gender,
                'dob': pet.dob,
                'age': pet.age,
                'weight': pet.weight,
                'remarks': pet.remarks,
                'image_url': pet.image.url,  # URL of the image
                'vaccines': [
                    {
                        'file': vaccine.file.url  # Get vaccine file URL
                    }
                    for vaccine in pet.vaccines.all()
                ]
            }
            for pet in pets
        ]

        return JsonResponse({"pets": pets_data}, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
# View to get a single pet's details
def view_onepet(request, pet_id):
    try:
        # Fetch pet details by petId
        pet = get_object_or_404(PetData, id=pet_id)
        
        # Prepare the response data (serialize data to return in JSON format)
        pet_data = {
            'id': pet.id,
            'name': pet.name,
            'breed': pet.breed,
            'gender': pet.gender,
            'dob': pet.dob,
            'age': pet.age,
            'weight': pet.weight,
            'remarks': pet.remarks,
            'image': pet.image.url if pet.image else None,
            'userid': pet.userid.id,
            'pet': pet.pet.id,
            'vaccinedata': [file.file.name for file in pet.vaccines.all()]  # Use 'vaccines' instead of 'vaccinedata'
        }

        return JsonResponse({"data": pet_data}, status=200)

    except PetData.DoesNotExist:
        return JsonResponse({"error": "Pet not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)  
    
@csrf_exempt
def update_petdata(request, pet_id):
    if request.method == "POST":
        try:
            pet_data_instance = PetData.objects.get(id=pet_id)

            name = request.POST.get("name")
            pet = request.POST.get("pet")
            breed = request.POST.get("breed")
            gender = request.POST.get("gender")
            dob = request.POST.get("dob")
            age = request.POST.get("age")
            weight = request.POST.get("weight")
            remarks = request.POST.get("remarks")
            userid = request.POST.get("userid")

            image = request.FILES.get("image")
            vaccine_files = request.FILES.getlist("vaccinedata")

            if name:
                pet_data_instance.name = name
            if pet:
                pet_instance = PetList.objects.get(id=pet)
                pet_data_instance.pet = pet_instance
            if breed:
                pet_data_instance.breed = breed
            if gender:
                pet_data_instance.gender = gender
            if dob:
                pet_data_instance.dob = dob
            if age:
                pet_data_instance.age = age
            if weight:
                pet_data_instance.weight = weight
            if remarks:
                pet_data_instance.remarks = remarks
            if userid:
                user = User.objects.get(id=userid)
                pet_data_instance.userid = user
            if image:
                pet_data_instance.image = image

            pet_data_instance.save()

            if vaccine_files:
                # Instead of deleting existing files, we append new ones
                for file in vaccine_files:
                    VaccineData.objects.create(pet=pet_data_instance, file=file)

            return JsonResponse({"message": "Pet updated successfully!"}, status=200)

        except PetData.DoesNotExist:
            return JsonResponse({"error": "Pet not found"}, status=404)
        except PetList.DoesNotExist:
            return JsonResponse({"error": "Invalid pet ID"}, status=400)
        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid user ID"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def view_doctor_booking(request, userid):
    if request.method == "GET":
        try:
            bookings = DoctorBooking.objects.select_related('doctorid__userid', 'userid') \
                                            .filter(userid__id=userid)

            data = []
            for booking in bookings:
                doctor_user_data = UserData.objects.filter(userid=booking.doctorid.userid).first()
                patient_user_data = UserData.objects.filter(userid=booking.userid).first()

                data.append({
                    "booking_id": booking.id,
                    "date": booking.date,
                    "session": booking.session,
                    "fees": booking.fees,
                    "status": booking.status,
                    "reason":booking.cancellation_reason,
                    "paymentId": booking.paymentId,
                    "serviceCenter": booking.serviceCenter,
                    "doctor_name": booking.doctorid.name,
                    "doctor_user_name": doctor_user_data.name if doctor_user_data else "",
                    "user_name": patient_user_data.name if patient_user_data else "",
                })

            return JsonResponse({"bookings": data}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "GET method required"}, status=405)


@csrf_exempt
def check_trainer_booking_availability(request):
    try:
        data = json.loads(request.body)
        trainer_id = data.get("trainerid")
        date = data.get("date")
        session = data.get("session")

        if not all([trainer_id, date, session]):
            return JsonResponse({"error": "Missing required fields"}, status=400)

        trainer = Trainerdetails.objects.get(id=trainer_id)
        existing_booking = TrainerBooking.objects.filter(
            trainerid=trainer, date=date, session=session, status="1"
        ).exists()

        if existing_booking:
            return JsonResponse({
                "available": False,
                "message": "This session is already booked. Please choose another session."
            }, status=200)

        return JsonResponse({"available": True}, status=200)

    except Trainerdetails.DoesNotExist:
        return JsonResponse({"error": "Trainer not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def create_trainer_booking(request):
    try:
        data = json.loads(request.body)

        trainer_id = data.get("trainerid")
        user_id = data.get("userid")
        date = data.get("date")
        session = data.get("session")
        fees = data.get("fees")
        payment_id = data.get("paymentId")
        service_center = data.get("serviceCenter")

        # Validate required fields
        if not all([trainer_id, user_id, date, session, fees, payment_id]):
            return JsonResponse({"error": "All fields are required"}, status=400)

        trainer = Trainerdetails.objects.get(id=trainer_id)
        user = User.objects.get(id=user_id)

        booking = TrainerBooking.objects.create(
            trainerid=trainer,
            userid=user,
            date=date,
            session=session,
            fees=fees,
            serviceCenter=service_center,
            paymentId=payment_id,
            status="1"
        )

        return JsonResponse({"message": "Trainer session booked successfully", "booking_id": booking.id}, status=201)

    except Trainerdetails.DoesNotExist:
        return JsonResponse({"error": "Trainer not found"}, status=404)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
@csrf_exempt
def view_trainer_booking(request, userid):
    try:
        bookings = TrainerBooking.objects.filter(userid__id=userid).select_related('trainerid')

        booking_list = []
        for booking in bookings:
            booking_list.append({
                "serviceCenter": booking.serviceCenter,
                "triner_name": booking.trainerid.name,
                "date": booking.date.strftime('%Y-%m-%d'),
                "session": booking.session,
                "fees": booking.fees,
                "paymentId": booking.paymentId,
                "status": booking.status,
                "reason":booking.cancellation_reason
            })

        return JsonResponse({"bookings": booking_list}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@csrf_exempt
def check_grooming_availability(request):
    try:
        data = json.loads(request.body)
        grooming_id = data.get("groomingId")
        date = data.get("date")
        session = data.get("session")

        if not all([grooming_id, date, session]):
            return JsonResponse({"error": "Missing required fields"}, status=400)

        # Check for existing booking with same grooming service, date, and session
        exists = GroomingBooking.objects.filter(
            groomingid__id=grooming_id,
            date=date,
            session=session,
            status="1"
        ).exists()

        if exists:
            return JsonResponse({"available": False, "message": "This slot is already booked. Please check another session"})
        else:
            return JsonResponse({"available": True})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@csrf_exempt
def create_grooming_booking(request):
    try:
        data = json.loads(request.body)

        grooming_id = data.get("groomingId")
        user_id = data.get("userId")
        date = data.get("date")
        session = data.get("session")
        price = data.get("price")
        payment_id = data.get("paymentId")
        service_center = data.get("serviceCenter")

        if not all([grooming_id, user_id, date, session, price, payment_id, service_center]):
            return JsonResponse({"error": "All fields are required"}, status=400)

        grooming = Groomingdetails.objects.get(id=grooming_id)
        user = User.objects.get(id=user_id)

        booking = GroomingBooking.objects.create(
            groomingid=grooming,
            userid=user,
            date=date,
            session=session,
            price=price,
            paymentId=payment_id,
            serviceCenter=service_center
        )

        return JsonResponse({
            "message": "Grooming appointment booked successfully",
            "booking_id": booking.id
        }, status=201)

    except Groomingdetails.DoesNotExist:
        return JsonResponse({"error": "Grooming service not found"}, status=404)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def view_grooming_booking(request, userid):
    try:
        bookings = GroomingBooking.objects.filter(userid__id=userid).select_related('groomingid')
        
        data = []
        for booking in bookings:
            data.append({
                "serviceCenter": booking.serviceCenter,
                "grooming_name": booking.groomingid.name,
                "date": booking.date.strftime('%Y-%m-%d'),
                "session": booking.session,
                "fees": booking.price,
                "paymentId": booking.paymentId,
                "reason":booking.cancellation_reason,
                "status": str(booking.status),  # Convert to string if needed on frontend
            })

        return JsonResponse({"bookings": data}, status=200)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)   


@csrf_exempt
def create_feedback(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        fullname = data.get('fullname')
        subject = data.get('subject')
        message = data.get('message')
        userid = data.get('userId')

        # Convert userId to a User instance
        try:
            user_instance = User.objects.get(id=userid)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        # Save feedback
        fb = feedback.objects.create(
            email=email,
            fullname=fullname,
            subject=subject,
            message=message,
            userid=user_instance
        )

        return JsonResponse({'message': 'Feedback submitted successfully', 'id': fb.id}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

    
@csrf_exempt
def view_feedback(request):
    feedbacks = feedback.objects.all().values('id', 'fullname', 'email', 'subject', 'message', 'reply', 'status', 'created_at')
    return JsonResponse(list(feedbacks), safe=False)


@csrf_exempt
def reply_feedback(request, id):
    try:
        data = json.loads(request.body)
        reply = data.get('reply')

        if not reply:
            return JsonResponse({'error': 'Reply message is required'}, status=400)

        fb = feedback.objects.get(id=id)
        fb.reply = reply
        fb.status = "1"  # Mark as replied
        fb.save()

        return JsonResponse({'message': 'Reply submitted successfully'})

    except feedback.DoesNotExist:
        return JsonResponse({'error': 'Feedback not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    

@csrf_exempt
def get_user_feedback(request, userid):
    try:
        user_feedbacks = feedback.objects.filter(userid=userid).order_by('-created_at')
        feedback_list = [{
            'id': fb.id,
            'fullname': fb.fullname,
            'email': fb.email,
            'subject': fb.subject,
            'message': fb.message,
            'reply': fb.reply,
            'status': fb.status,
            'created_at': fb.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        } for fb in user_feedbacks]

        return JsonResponse({'feedbacks': feedback_list}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

@csrf_exempt
def get_trainer_bookings_by_service_center(request):
    try:
        if request.method != 'POST':
            return JsonResponse({"error": "POST method required"}, status=405)

        data = json.loads(request.body)
        service_center_userid = data.get("userid")

        if not service_center_userid:
            return JsonResponse({"error": "userid is required"}, status=400)

        # Get trainers belonging to the service center
        trainers = Trainerdetails.objects.filter(userid__id=service_center_userid)

        if not trainers.exists():
            return JsonResponse({"message": "No trainers found for this service center"}, status=404)

        # Get all bookings for those trainers
        bookings = TrainerBooking.objects.filter(
            trainerid__in=trainers
        ).select_related("trainerid", "userid")

        # Fetch customer info
        customer_ids = bookings.values_list("userid", flat=True)
        customers = CustomerData.objects.filter(userid__id__in=customer_ids).select_related("userid")
        customer_map = {
            c.userid.id: {
                "name": c.name,
                "contact": c.contact,
                "username": c.userid.username  # Optional, not used here
            }
            for c in customers
        }

        # Prepare response data
        bookings_data = []
        for b in bookings:
            pets = PetData.objects.filter(userid=b.userid)
            pet_details = [
                {
                    "name": pet.name,
                    "breed": pet.breed,
                    "gender": pet.gender,
                    "weight": pet.weight,
                    "age": pet.age,
                    "dob": pet.dob,
                    "remarks": pet.remarks,
                    "image_url": pet.image.url if pet.image else "",
                    "vaccines": [
                        {
                            "file": vaccine.file.url
                        }
                        for vaccine in pet.vaccines.all()
                    ]
                }
                for pet in pets
            ]

            customer_info = customer_map.get(b.userid.id, {}) if b.userid else {}

            bookings_data.append({
                "booking_id": b.id,
                "trainer_name": b.trainerid.name,
                "customer_id": b.userid.id,
                "customer_name": customer_info.get("name", ""),
                "customer_contact": customer_info.get("contact", ""),
                "date": str(b.date),
                "session": b.session,
                "fees": b.fees,
                "paymentId": b.paymentId,
                "serviceCenter": b.serviceCenter,
                "status": b.status,
                "pets": pet_details
            })

        return JsonResponse({"bookings": bookings_data}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
      

@csrf_exempt
def get_doctor_bookings_by_service_center(request):
    try:
        if request.method != 'POST':
            return JsonResponse({"error": "POST method required"}, status=405)

        data = json.loads(request.body)
        service_center_userid = data.get("userid")

        if not service_center_userid:
            return JsonResponse({"error": "userid is required"}, status=400)

        # Get doctor(s) belonging to the service center
        doctor = Doctordetails.objects.filter(userid__id=service_center_userid)

        if not doctor.exists():
            return JsonResponse({"message": "No doctor found for this service center"}, status=404)

        # Get all bookings for those doctors
        bookings = DoctorBooking.objects.filter(
            doctorid__in=doctor
        ).select_related("doctorid", "userid")

        # Get related CustomerData to fetch name and contact
        customer_ids = bookings.values_list("userid", flat=True)
        customers = CustomerData.objects.filter(userid__id__in=customer_ids).select_related("userid")
        customer_map = {
            c.userid.id: {
                "name": c.name,
                "contact": c.contact,
                "username": c.userid.username  # still available if needed
            }
            for c in customers
        }

        # Prepare response data
        bookings_data = []
        for b in bookings:
            pets = PetData.objects.filter(userid=b.userid)
            pet_details = [
                {
                    "name": pet.name,
                    "breed": pet.breed,
                    "gender": pet.gender,
                    "weight": pet.weight,
                    "age": pet.age,
                    "dob": pet.dob,
                    "remarks": pet.remarks,
                    "image_url": pet.image.url if pet.image else "",
                    "vaccines": [
                        {
                            "file": vaccine.file.url
                        }
                        for vaccine in pet.vaccines.all()
                    ]
                }
                for pet in pets
            ]

            customer_info = customer_map.get(b.userid.id, {}) if b.userid else {}

            bookings_data.append({
                "booking_id": b.id,
                "doctor_name": b.doctorid.name,
                "customer_id": b.userid.id if b.userid else None,
                "customer_name": customer_info.get("name", ""),
                "customer_contact": customer_info.get("contact", ""),
                "date": b.date.isoformat() if hasattr(b.date, 'isoformat') else b.date,
                "session": b.session,
                "fees": b.fees,
                "paymentId": b.paymentId,
                "serviceCenter": b.serviceCenter,
                "status": b.status,
                "pets": pet_details
            })

        return JsonResponse({"bookings": bookings_data}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    


@csrf_exempt
def get_grooming_bookings_by_service_center(request):
    try:
        if request.method != 'POST':
            return JsonResponse({"error": "POST method required"}, status=405)

        data = json.loads(request.body)
        service_center_userid = data.get("userid")

        if not service_center_userid:
            return JsonResponse({"error": "userid is required"}, status=400)

        # Get grooming entries for the given service center user
        grooming = Groomingdetails.objects.filter(userid__id=service_center_userid)

        if not grooming.exists():
            return JsonResponse({"message": "No grooming found for this service center"}, status=404)

        # Get all grooming bookings for those grooming entries
        bookings = GroomingBooking.objects.filter(
            groomingid__in=grooming
        ).select_related("groomingid", "userid")

        # Fetch customer info
        customer_ids = bookings.values_list("userid", flat=True)
        customers = CustomerData.objects.filter(userid__id__in=customer_ids).select_related("userid")
        customer_map = {
            c.userid.id: {
                "name": c.name,
                "contact": c.contact,
                "username": c.userid.username  # Optional
            }
            for c in customers
        }

        # Prepare response data
        bookings_data = []
        for b in bookings:
            # Fetch all pets belonging to this user
            pets = PetData.objects.filter(userid=b.userid)
            pet_details = [
                {
                    "name": pet.name,
                    "breed": pet.breed,
                    "gender": pet.gender,
                    "weight": pet.weight,
                    "age": pet.age,
                    "dob": pet.dob,
                    "remarks": pet.remarks,
                    "image_url": pet.image.url if pet.image else "",
                    "vaccines": [
                        {
                            "file": vaccine.file.url
                        }
                        for vaccine in pet.vaccines.all()
                    ]
                }
                for pet in pets
            ]

            customer_info = customer_map.get(b.userid.id, {}) if b.userid else {}

            bookings_data.append({
                "booking_id": b.id,
                "grooming_name": b.groomingid.name,
                "customer_id": b.userid.id,
                "customer_name": customer_info.get("name", ""),
                "customer_contact": customer_info.get("contact", ""),
                "date": str(b.date),
                "session": b.session,
                "fees": b.price,
                "paymentId": b.paymentId,
                "serviceCenter": b.serviceCenter,
                "status": b.status,
                "pets": pet_details
            })

        return JsonResponse({"bookings": bookings_data}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@csrf_exempt
def add_to_cart(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            user_id = data.get("userId")
            item_id = data.get("itemid")
            quantity = data.get("quantity", 1)
            price = data.get("price")
            seller_id = data.get("sellerId")
            item_category = data.get("itemcategory")

            user = User.objects.get(id=user_id)

            # Determine model based on item_category
            if item_category == "food":
                item_model = FoodItem
            elif item_category == "medicine":
                item_model = Medicine
            elif item_category == "accessory":
                item_model = Accessory
            else:
                return JsonResponse({"success": False, "message": "Invalid item category."}, status=400)

            item_obj = item_model.objects.get(id=item_id)
            content_type = ContentType.objects.get_for_model(item_model)

            existing = Cart.objects.filter(
                content_type=content_type,
                object_id=item_id,
                userid=user,
                status="0"
            ).first()

            if existing:
                existing.count += quantity
                existing.save()
            else:
                Cart.objects.create(
                    content_type=content_type,
                    object_id=item_id,
                    itemcategory=item_category,
                    sellerid=seller_id,
                    price=price,
                    count=quantity,
                    userid=user
                )

            return JsonResponse({"success": True, "message": "Item added to cart successfully."})

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)

    return JsonResponse({"success": False, "message": "Invalid request method"}, status=405)


@csrf_exempt
def view_cart(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get("userId")

            user = User.objects.get(id=user_id)
            cart_items = Cart.objects.filter(userid=user, status="0").order_by('-created_at')
            cart_data = []

            for item in cart_items:
                item_details = {
                    "cartId": item.id,
                    "itemId": item.object_id,  # Include the actual item ID
                    "itemcategory": item.itemcategory,
                    "sellerId": item.sellerid,
                    "price": float(item.price),
                    "quantity": item.count,
                    "created_at": item.created_at,
                    "updated_at": item.updated_at,
                }

                # Fetch seller name and contact
                try:
                    seller_user = User.objects.get(id=item.sellerid)
                    seller_data = UserData.objects.get(userid=seller_user)
                    item_details["seller_name"] = seller_data.name
                    item_details["seller_contact"] = seller_data.contact
                except (User.DoesNotExist, UserData.DoesNotExist):
                    item_details["seller_name"] = "Unknown"
                    item_details["seller_contact"] = "N/A"

                # Get the actual item details based on category
                if item.itemcategory == "food":
                    food_item = FoodItem.objects.get(id=item.object_id)
                    item_details.update({
                        "itemname": food_item.itemname,
                        "image": food_item.image.url if food_item.image else None,
                    })

                elif item.itemcategory == "medicine":
                    medicine_item = Medicine.objects.get(id=item.object_id)
                    item_details.update({
                        "itemname": medicine_item.medicine_name,
                        "image": medicine_item.image.url if medicine_item.image else None,
                    })

                elif item.itemcategory == "accessory":
                    accessory_item = Accessory.objects.get(id=item.object_id)
                    item_details.update({
                        "itemname": accessory_item.accessory_name,
                        "image": accessory_item.image.url if accessory_item.image else None,
                    })

                cart_data.append(item_details)

            return JsonResponse({"success": True, "cartItems": cart_data}, status=200)

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)

    return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)


# views.py
@csrf_exempt
def delete_cart_item(request):
    if request.method == "DELETE":
        try:
            cart_id = request.GET.get("cartId")
            cart_item = Cart.objects.get(id=cart_id)
            cart_item.delete()
            return JsonResponse({"success": True, "message": "Item deleted successfully."})
        except Cart.DoesNotExist:
            return JsonResponse({"success": False, "message": "Cart item not found."}, status=404)
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)
    return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)


@csrf_exempt
def create_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get("userId")
            items = data.get("items", [])

            user = User.objects.get(id=user_id)

            # Create a new Order instance
            order = Order.objects.create(
                user=user,
                payment_id=data.get("paymentId", ""),
                order_date=timezone.now(),
                status="Pending"
            )

            # Save individual items to OrderItem and update stock count
            for item in items:
                item_category = item.get("itemcategory")
                price = item.get("price")
                quantity = item.get("quantity")
                seller_id = item.get("seller_id")
                item_id = item.get("object_id")

                # Get the content_type based on category
                if item_category == "food":
                    model = FoodItem
                elif item_category == "medicine":
                    model = Medicine
                elif item_category == "accessory":
                    model = Accessory
                else:
                    continue  # Invalid item category

                content_type = ContentType.objects.get_for_model(model)

                # Save order item
                order_item = OrderItem.objects.create(
                    order=order,
                    content_type=content_type,
                    object_id=item_id,
                    itemcategory=item_category,
                    price=price,
                    quantity=quantity,
                    sellerid=seller_id
                )

                # Update the corresponding Cart item status to "1" (purchased)
                Cart.objects.filter(
                    userid=user,
                    content_type=content_type,
                    object_id=item_id,
                    status="0"
                ).update(status="1")

                # Decrease the stock count in the relevant model
                if item_category == "food":
                    food_item = FoodItem.objects.get(id=item_id)
                    food_item.count -= quantity
                    food_item.save()
                elif item_category == "medicine":
                    medicine_item = Medicine.objects.get(id=item_id)
                    medicine_item.count -= quantity
                    medicine_item.save()
                elif item_category == "accessory":
                    accessory_item = Accessory.objects.get(id=item_id)
                    accessory_item.count -= quantity
                    accessory_item.save()

            return JsonResponse({"success": True, "message": "Order placed successfully."}, status=200)

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)

    return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)


# @csrf_exempt
# def create_order(request):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
#             user_id = data.get("userId")
#             items = data.get("items", [])

#             user = User.objects.get(id=user_id)

#             # Create a new Order instance
#             order = Order.objects.create(
#                 user=user,
#                 payment_id=data.get("paymentId", ""),  # You can modify this based on structure
#                 order_date=timezone.now(),
#                 status="Pending"
#             )

#             # Save individual items to OrderItem
#             for item in items:
#                 item_category = item.get("itemcategory")
#                 price = item.get("price")
#                 quantity = item.get("quantity")
#                 seller_id = item.get("seller_id")
#                 item_id = item.get("object_id")  


#                 # Get the content_type based on category
#                 if item_category == "food":
#                     model = FoodItem
#                 elif item_category == "medicine":
#                     model = Medicine
#                 elif item_category == "accessory":
#                     model = Accessory
#                 else:
#                     continue  # Invalid item category

#                 content_type = ContentType.objects.get_for_model(model)

#                 # Save order item
#                 OrderItem.objects.create(
#                     order=order,
#                     content_type=content_type,
#                     object_id=item_id,
#                     itemcategory=item_category,
#                     price=price,
#                     quantity=quantity,
#                     sellerid=seller_id
#                 )

#                 # Update the corresponding Cart item status to "1" (purchased)
#                 Cart.objects.filter(
#                     userid=user,
#                     content_type=content_type,
#                     object_id=item_id,
#                     status="0"
#                 ).update(status="1")

#             return JsonResponse({"success": True, "message": "Order placed successfully."}, status=200)

#         except Exception as e:
#             return JsonResponse({"success": False, "message": str(e)}, status=400)

#     return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)


@csrf_exempt
def view_order(request):
    if request.method == "GET":
        try:
            user_id = request.GET.get("userId")
            if not user_id:
                return JsonResponse({"success": False, "message": "User ID is required."}, status=400)

            user = get_object_or_404(User, id=user_id)

            # Fetch orders for the user
            orders = Order.objects.filter(user=user).order_by('-order_date')
            if not orders:
                return JsonResponse({"success": False, "message": "No orders found for this user."}, status=404)

            order_list = []

            for order in orders:
                order_items = OrderItem.objects.filter(order=order)
                item_list = []

                for item in order_items:
                    # Determine the item model based on the content type
                    if item.itemcategory == "food":
                        model = FoodItem
                    elif item.itemcategory == "medicine":
                        model = Medicine
                    elif item.itemcategory == "accessory":
                        model = Accessory
                    else:
                        continue  # Skip invalid item categories

                    # Get the item details using the content_type and object_id
                    item_details = model.objects.filter(id=item.object_id).first()
                    if not item_details:
                        continue  # Skip if item details are not found

                    item_info = {
                        "item_name": getattr(item_details, 'itemname', None) or getattr(item_details, 'medicine_name', None) or getattr(item_details, 'accessory_name', None),
                        "quantity": item.quantity,
                        "price": item.price,
                        "total_price": item.price * item.quantity,
                        "category": item.itemcategory,
                        "status": order.status,
                        "deliverystatus": item.deliverystatus,
                        "image_url": item_details.image.url if item_details.image else '/path/to/default-image.jpg',
                    }

                    item_list.append(item_info)

                order_info = {
                    "order_id": order.id,
                    "payment_id": order.payment_id,
                    "order_date": order.order_date,
                    "status": order.status,
                    "items": item_list,
                }

                order_list.append(order_info)

            return JsonResponse({"success": True, "orders": order_list}, status=200)

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)

    return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)


@csrf_exempt
def view_seller_order(request):
    if request.method == "GET":
        try:
            seller_id = request.GET.get("sellerId")
            if not seller_id:
                return JsonResponse({"success": False, "message": "Seller ID is required."}, status=400)

            # Fetch all order items related to the given seller_id
            order_items = OrderItem.objects.filter(sellerid=seller_id)
            if not order_items:
                return JsonResponse({"success": False, "message": "No orders found for this seller."}, status=404)

            order_list = []

            # Iterate through the order items and fetch relevant data
            for item in order_items:
                order = item.order
                user = order.user

                # Fetch customer data
                try:
                    customer = CustomerData.objects.get(userid=user)
                except CustomerData.DoesNotExist:
                    customer = None  # If no customer data exists, set to None

                # Determine the item model based on the content type
                if item.itemcategory == "food":
                    model = FoodItem
                elif item.itemcategory == "medicine":
                    model = Medicine
                elif item.itemcategory == "accessory":
                    model = Accessory
                else:
                    continue  # Skip invalid item categories

                # Get the item details using the content_type and object_id
                content_type = ContentType.objects.get_for_model(model)
                item_details = model.objects.filter(id=item.object_id).first()

                if not item_details:
                    continue  # Skip if item details are not found

                # Prepare item information
                item_info = {
                    "item_name": getattr(item_details, 'itemname', None) or getattr(item_details, 'medicine_name', None) or getattr(item_details, 'accessory_name', None),
                    "quantity": item.quantity,
                    "price": item.price,
                    "total_price": item.price * item.quantity,
                    "category": item.itemcategory,
                    "status": order.status,
                    "deliverystatus": item.deliverystatus,
                    "image_url": item_details.image.url if item_details.image else '/path/to/default-image.jpg',
                }

                # If the order already exists in order_list, append the item to the existing order
                existing_order = next((o for o in order_list if o["order_id"] == order.id), None)
                if existing_order:
                    existing_order["items"].append(item_info)
                else:
                    # Create a new entry for the order if not already in the list
                    order_info = {
                        "order_id": order.id,
                        "payment_id": order.payment_id,
                        "order_date": order.order_date,
                        "status": order.status,
                        "items": [item_info],  # Add the current item as the first item in the list
                        "customer_details": {
                            "name": customer.name if customer else "Unknown",
                            "contact": customer.contact if customer else "Unknown",
                            "address": customer.address if customer else "Unknown",
                            "usertype": customer.usertype if customer else "Unknown"
                        }
                    }
                    order_list.append(order_info)

            return JsonResponse({"success": True, "orders": order_list}, status=200)

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)

    return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)


@csrf_exempt
def get_all_orders(request):
    try:
        # Fetch all orders
        orders = Order.objects.all()

        # Initialize a list to hold all order details
        all_order_details = []

        # Loop through each order to extract details
        for order in orders:
            # Get the customer's name
            customer_data = CustomerData.objects.get(userid=order.user.id)
           
            # Loop through each order item to extract the item details
            for order_item in order.items.all():
                # Get the seller name for each order item
                try:
                    seller_data = UserData.objects.get(userid=order_item.sellerid)
          
                    seller_name = seller_data.name
                except (User.DoesNotExist, UserData.DoesNotExist):
                    seller_name = None  # If no seller exists for this user

                # Get the related item (food, medicine, or accessory)
                item = None
                if order_item.itemcategory == 'food':
                    item = FoodItem.objects.get(id=order_item.object_id)
                    item_name = item.itemname if item else None
                elif order_item.itemcategory == 'medicine':
                    item = Medicine.objects.get(id=order_item.object_id)
                    item_name = item.medicine_name if item else None
                elif order_item.itemcategory == 'accessory':
                    item = Accessory.objects.get(id=order_item.object_id)
                    item_name = item.accessory_name if item else None

                # Add the order item details to the list
                all_order_details.append({
                    'order_id': order.id,
                    'item_name': item_name,
                    'item_price': order_item.price,
                    'item_quantity': order_item.quantity,
                    'total_price': order_item.price * order_item.quantity,
                    'payment_id': order.payment_id,
                    'order_date': order.order_date,
                    'customer_name': customer_data.name,
                    'seller_name': seller_name,
                })

        # Return all the order details as JSON response
        return JsonResponse({"success": True, "order_details": all_order_details}, status=200)

    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=400)
    


@csrf_exempt
def update_delivery_status(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            order_id = data.get('order_id')
            item_name = data.get('item_name')
            new_status = data.get('deliverystatus')

            if not all([order_id, item_name, new_status]):
                return JsonResponse({"success": False, "message": "Missing required fields."}, status=400)

            # Find the OrderItem based on order and item name
            order_items = OrderItem.objects.filter(order_id=order_id)

            found = False
            for item in order_items:
                actual_item = item.item
                # Check item name
                if (hasattr(actual_item, 'itemname') and actual_item.itemname == item_name) or \
                   (hasattr(actual_item, 'medicine_name') and actual_item.medicine_name == item_name) or \
                   (hasattr(actual_item, 'accessory_name') and actual_item.accessory_name == item_name):
                    item.deliverystatus = f"{new_status} at {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}"
                    item.save()
                    found = True
                    break

            if not found:
                return JsonResponse({"success": False, "message": "OrderItem not found."}, status=404)

            return JsonResponse({"success": True, "message": "Delivery status updated successfully."})

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)

    return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)

@csrf_exempt
def delete_order(request, order_id):
    if request.method == "DELETE":
        try:
            with transaction.atomic():  # Ensure the transaction is atomic
                # Try to fetch the order with the given ID
                order = Order.objects.get(id=order_id)
                
                # Deleting the order (this will also delete related OrderItems if they have `on_delete=models.CASCADE`)
                order.delete()

            return JsonResponse({"success": True, "message": "Order deleted successfully."}, status=200)
        except Order.DoesNotExist:
            return JsonResponse({"success": False, "message": "Order not found."}, status=404)
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)
    return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)


@csrf_exempt
def cancel_grooming_booking(request):
    try:
        if request.method != 'POST':
            return JsonResponse({"error": "POST method required"}, status=405)

        data = json.loads(request.body)
        booking_id = data.get("bookingId")
        cancellation_reason = data.get("reason")

        if not booking_id or not cancellation_reason:
            return JsonResponse({"error": "Booking ID and cancellation reason are required"}, status=400)

        # Find the booking
        booking = GroomingBooking.objects.filter(id=booking_id).first()
        if not booking:
            return JsonResponse({"error": "Booking not found"}, status=404)

        # Update the status and reason
        booking.status = "2"
        booking.cancellation_reason = cancellation_reason
        booking.save()

        # Create refund entry
        refund = customerRefund.objects.create(
            userId=booking.userid,
            amount=booking.price,
            date=timezone.now().strftime("%Y-%m-%d"),
            service_center=booking.serviceCenter,
            service="Grooming session"
        )

        return JsonResponse({"message": "Booking cancelled and refund issued successfully"}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@csrf_exempt
def cancel_doctor_booking(request):
    try:
        if request.method != 'POST':
            return JsonResponse({"error": "POST method required"}, status=405)

        data = json.loads(request.body)
        booking_id = data.get("bookingId")
        cancellation_reason = data.get("reason")

        if not booking_id or not cancellation_reason:
            return JsonResponse({"error": "Booking ID and cancellation reason are required"}, status=400)

        booking = DoctorBooking.objects.filter(id=booking_id).first()
        if not booking:
            return JsonResponse({"error": "Booking not found"}, status=404)

        booking.status = "2"
        booking.cancellation_reason = cancellation_reason
        booking.save()

        refund = customerRefund.objects.create(
            userId=booking.userid,
            amount=booking.fees,
            date=timezone.now().strftime("%Y-%m-%d"),
            service_center=booking.serviceCenter,
            service="Doctor consultation"
        )
        return JsonResponse({"message": "Booking cancelled successfully"}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def cancel_trainer_booking(request):
    try:
        if request.method != 'POST':
            return JsonResponse({"error": "POST method required"}, status=405)

        data = json.loads(request.body)
        booking_id = data.get("bookingId")
        cancellation_reason = data.get("reason")

        if not booking_id or not cancellation_reason:
            return JsonResponse({"error": "Booking ID and cancellation reason are required"}, status=400)

        booking = TrainerBooking.objects.filter(id=booking_id).first()
        if not booking:
            return JsonResponse({"error": "Booking not found"}, status=404)

        booking.status = "2"
        booking.cancellation_reason = cancellation_reason
        booking.save()

        refund = customerRefund.objects.create(
            userId=booking.userid,
            amount=booking.fees,
            date=timezone.now().strftime("%Y-%m-%d"),
            service_center=booking.serviceCenter,
            service="Training session"
        )

        return JsonResponse({"message": "Booking cancelled successfully"}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def view_user_refunds(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        refunds = customerRefund.objects.filter(userId=user)

        refund_list = [
            {
                "amount": refund.amount,
                "service": refund.service,
                "date": refund.date,
                "service_center": refund.service_center
            }
            for refund in refunds
        ]

        return JsonResponse({"refunds": refund_list}, status=200)
    
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
