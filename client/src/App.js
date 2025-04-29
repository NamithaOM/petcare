import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Auth/Landing";
import About from "./Auth/About";
import Footer from "./Auth/Footer";
import Header from "./Auth/Header";
import Contact from "./Auth/Contact";
import Details from "./Auth/Details";
import Price from "./Auth/Price";
import Forms from "./Auth/Forms";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./User/Dashboard";
import Trainers from "./User/Trainers";
import Doctors from "./User/Doctors";
import Grooming from "./User/Grooming";
import Medicines from "./User/Medicines";
import FoodItems from "./User/FoodItems";
import Accessories from "./User/Accessories";
import DoctorProfile from "./User/DoctorProfile";
import TrainerProfile from "./User/TrainerProfile";
import GroomingDetails from "./User/GroomingDetails";
import MedicineDetails from "./User/MedicineDetails";
import PetDetails from "./User/PetDetails";
import PetProfile from "./User/PetProfile";
import UpdatePetDetails from "./User/UpdatePetDetails";
import AccessoryDetails from "./User/AccessoryDetails";
import DoctorBookings from "./User/DoctorBookings";
import Message from "./User/Message";
import TrainerBookings from "./User/TrainerBookings";
import GroomingBooking from "./User/GroomingBooking";
import ViewCart from "./User/ViewCart";
import FoodDetails from "./User/FoodDetails";
import Order from "./User/Order";
import Profile from "./User/Profile";
import UpdateProfile from "./User/UpdateProfile";
import New from "./Auth/New";
import UserWallet from "./User/UserWallet";
import Clients from "./Auth/Serve";
import Scroll from "./Auth/Scroll";

function App() {
  const [userType] = useState(localStorage.getItem("userType"));

  return (
    <BrowserRouter>
      <Routes>
        {userType == null ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/header" element={<Header />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/service" element={<Price />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/details" element={<Details />} />
            <Route path="/scroll" element={<Scroll/>} />
            <Route path="/client" element={<Clients />} />

          </>
        ) : userType === "customer" ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trainer" element={<Trainers />} />
            <Route path="/doctor" element={<Doctors />} />
            <Route path="/grooming" element={<Grooming />} />
            <Route path="/medicine" element={<Medicines />} />
            <Route path="/food" element={<FoodItems />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
            <Route path="/trainer-profile/:id" element={<TrainerProfile />} />
            <Route path="/grooming-details/:id" element={<GroomingDetails />} />
            <Route path="/medicine-details/:id" element={<MedicineDetails />} />
            <Route path="/food-details/:id" element={<FoodDetails />} />
            <Route path="/accessory-details/:id" element={<AccessoryDetails />} />
            <Route path="/drBooking" element={<DoctorBookings />} />
            <Route path="/trainerBooking" element={<TrainerBookings />} />
            <Route path="/groomingBooking" element={<GroomingBooking />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/petdetails" element={<PetDetails />} />
            <Route path="/petprofile" element={<PetProfile />} />
            <Route path="/updatepet/:id" element={<UpdatePetDetails />} />
            <Route path="/cart" element={<ViewCart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateprofile/:id" element={<UpdateProfile />} />
            <Route path="/wallet" element={<UserWallet />}/>



            <Route path="*" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
