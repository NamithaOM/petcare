"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('createcategory/', views.createCategory),
    path('allusers/', views.allusers),
    path('blockuser/<int:user_id>/', views.blockuser),
    path('deleteuser/<int:user_id>/', views.deleteuser),
    path('unblockuser/<int:user_id>/', views.unblockuser, name='unblockuser'),
    path('createUser/', views.createUser),
    path('login', views.loginUser),
    path('logout', views.logoutUser), 

# feedbacks
    path('feedback/create/', views.create_feedback, name='create_feedback'),
    path('feedback/view/', views.view_feedback, name='view_feedback'),
    path('feedback/reply/<int:id>/', views.reply_feedback, name='reply_feedback'),
    path('feedback/user/<int:userid>/', views.get_user_feedback, name='get_user_feedback'),
 # servicelist
    path('create_servicename/', views.create_service),
    path('update_servicename/<int:service_id>/', views.update_servicename),
    path('delete_servicename/<int:service_id>/', views.delete_servicename),
    path('list_servicename/', views.list_servicename),

    # petslist
    path('create_pet/', views.create_pet, name='create_pet'),
    path('update_pet/<int:pet_id>/', views.update_pet, name='update_pet'),
    path('delete_pet/<int:pet_id>/', views.delete_pet, name='delete_pet'),
    path('list_pets/', views.list_pets, name='list_pets'),

        # itemlist
    path('create_Item/', views.create_Item),
    path('update_Item/<int:item_id>/', views.update_Item),
    path('delete_Item/<int:item_id>/', views.delete_Item),
    path('list_Item/', views.list_Item),

    # doctor cruds
    path('addDoctor/', views.create_doctor),
    path('listDoctors/', views.list_doctors),
    path('viewdoctor/<int:id>/', views.view_doctor),
    path('editDoctor/<int:id>/', views.edit_doctor),
    path('deleteDoctor/<int:id>/', views.delete_doctor),
    # for userview
    path('allDoctors/', views.allDoctors),
    path('deleteDoctor/<int:doctor_id>/', views.deleteDoctor, name='deleteDoctor'),

# trainer crud
    path('addTrainer/', views.create_Trainer),
    path('viewTrainersByUser/<int:userid>/', views.view_trainers_by_user),
    path('viewTrainer/<int:id>/', views.view_Trainer),
    path('editTrainer/<int:id>/', views.edit_Trainer),
    path('deleteTrainer/<int:id>/', views.delete_Trainer),
    # for user view
    path('allTrainers/', views.alltrainers),
    path('deleteTrainer/<int:trainer_id>/', views.deleteTrainer, name='deleteTrainer'),
# All groomings
    path('groomingList/', views.list_Grooming),
    path('addGrooming/', views.create_Grooming),
    path('viewGrooming/<int:id>/', views.view_grooming, name='view_grooming'),
    path('updateGrooming/<int:id>/', views.update_Grooming, name='update_grooming'), 
    path('deleteGrooming/<int:id>', views.delete_grooming, name='delete_grooming'),
    # for user view
    path('allTgrooming/', views.allgrooming),

# food crud
    path('addfood/', views.create_food),
    path('view_food/<int:userid>/', views.view_food_by_user, name='view_food_by_user'),
    path('getfood/<int:foodid>/', views.get_food_item, name='get_food_item'),
    path('updatefood/<int:foodid>/', views.edit_food_item, name='edit_food_item'),
    path('delete_food/<int:foodid>/', views.delete_food_item, name='delete_food_item'),
# for user
    path('allfood/', views.allfood),

# medicine crud
    path('addmedicine/', views.create_medicine),
    path('view_medicine/<int:userid>/', views.view_medicine_by_user),
    path('getmedicine/<int:medicineid>/', views.get_medicine_item),
    path('updatemedicine/<int:medicineid>/', views.edit_medicine_item),
    path('delete_medicine/<int:medicineid>/', views.delete_medicine_item),
    # for user
    path('allmedicine/', views.allmedicine),

# accessory crud
    path('addaccessory/', views.create_accessory),
    path('view_accessories/<int:userid>/', views.view_accessories_by_user),
    path('get_accessory/<int:accessoryid>/', views.get_accessory),
    path('edit_accessory/<int:accessoryid>/', views.edit_accessory),
    path('delete_accessory/<int:accessoryid>/', views.delete_accessory),
# for user
    path('allaccessory/', views.allaccessory),

# customer registeration
    path('createCustomer/', views.createCustomer, name='create-customer'),
    path('profile/<int:user_id>/', views.getCustomerProfile, name='get_customer_profile'),
    path('updateprofile/<int:user_id>/', views.updateCustomerProfile, name='update_customer_profile'),
    path('create-doctor-booking/', views.create_doctor_booking),
    path('view-doctor-booking/<int:userid>', views.view_doctor_booking),
    path('check-doctor-booking-availability/', views.check_doctor_booking_availability),
    # path('doctor-booking/<int:userid>', views.doctor_booking),
    path('create-trainer-booking/', views.create_trainer_booking),
    path('check-trainer-booking-availability/', views.check_trainer_booking_availability),
    path('get_trainer_bookings_by_service_center',views.get_trainer_bookings_by_service_center),
    path('get_doctor_bookings_by_service_center',views.get_doctor_bookings_by_service_center),
    path('get_grooming_bookings_by_service_center',views.get_grooming_bookings_by_service_center),

    path('view-trainer-booking/<int:userid>', views.view_trainer_booking),
    # path('trainer-booking/<int:userid>', views.trainer_booking),
    path('create-grooming-booking/', views.create_grooming_booking),
    path('check-grooming-availability/', views.check_grooming_availability),

    path('view-grooming-booking/<int:userid>', views.view_grooming_booking),
    # path('grooming-booking/<int:userid>', views.grooming_booking),

    path('add_pet/', views.add_pet),
    path('pet_profile/user/<int:user_id>/', views.view_pet_profile, name='view_pet_profile_by_user'),
    path('update_petdata/<int:pet_id>/', views.update_petdata),
    path('view_onepet/<int:pet_id>/', views.view_onepet, name='view_onepet'),

    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
    path('view-cart/', views.view_cart, name='view_cart'),
    path("create-order/", views.create_order, name="create_order"),
    path("delete-cart-item/", views.delete_cart_item, name="delete_cart_item"),
    path('view-order/', views.view_order, name='view_order'),
    path('view-seller-order/', views.view_seller_order, name='view_seller_order'),
    path('get_order_details/', views.get_all_orders, name='get_all_orders'),
    path('update-delivery-status/', views.update_delivery_status),
    path('delete-order/<int:order_id>/', views.delete_order, name='delete_order'),
    path('cancel_grooming_booking/', views.cancel_grooming_booking),
    path('cancel_doctor_booking/', views.cancel_doctor_booking),
    path('cancel_trainer_booking/', views.cancel_trainer_booking),
    path("view_refunds/<int:user_id>/", views.view_user_refunds, name="view_user_refunds"),

] 
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)