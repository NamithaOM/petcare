import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ServiceList from "./Components/Admin/ServiceList";
import SaleItemList from "./Components/Admin/SaleItemList";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import PetsList from "./Components/Admin/PetsList";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import { useAuth } from "./Components/Auth/AuthContext";
import ServiceDashboard from "./Components/Service/ServiceDashboard";
import AddGrooming from "./Components/Service/AddGrooming";
import AddTrainer from "./Components/Service/AddTrainer";
import AddDoctor from "./Components/Service/AddDoctor";
import ViewGrooming from "./Components/Service/ViewGrooming";
import EditGrooming from "./Components/Service/EditGrooming";
import EditDoctor from "./Components/Service/EditDoctor";
import DoctorsList from "./Components/Service/DoctorsList";
import ViewTrainer from "./Components/Service/ViewTrainer";
import EditTrainer from "./Components/Service/EditTrainer";
import SellerDashboard from "./Components/Seller/SellerDashboard";
import AddFood from "./Components/Seller/AddFood";
import ViewFood from "./Components/Seller/ViewFood";
import EditFood from "./Components/Seller/EditFood";
import EditMedicine from "./Components/Seller/EditMedicine";
import ViewMedicine from "./Components/Seller/ViewMedicine";
import AddMedicine from "./Components/Seller/AddMedicine";
import AddAccessory from "./Components/Seller/AddAccessory";
import ViewAccessories from "./Components/Seller/ViewAccessories";
import EditAccessory from "./Components/Seller/EditAccessory";
import AllDoctors from "./Components/Admin/AllDoctors";
import AllTrainers from "./Components/Admin/AllTrainers";
import AllUsers from "./Components/Admin/AllUsers";
import Feedbacks from "./Components/Admin/Feedbacks";
import Bookings from "./Components/Service/Bookings";
import PetDetails from "./Components/Service/PetDetails";
import OrderList from "./Components/Seller/OrderList";
import CustomerOrders from "./Components/Admin/CustomerOrders";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Redirect /admin to /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute
              element={<AdminDashboard />}
              allowedTypes={["admin"]}
            />
          }
        />
        <Route
          path="/admin/pets"
          element={
            <PrivateRoute element={<PetsList />} allowedTypes={["admin"]} />
          }
        />
        <Route
          path="/admin/trainers"
          element={
            <PrivateRoute element={<AllTrainers />} allowedTypes={["admin"]} />
          }
        />
        <Route
          path="/admin/staffs"
          element={
            <PrivateRoute element={<AllUsers />} allowedTypes={["admin"]} />
          }
        />
         <Route
          path="/admin/orders"
          element={
            <PrivateRoute element={<CustomerOrders />} allowedTypes={["admin"]} />
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <PrivateRoute element={<AllDoctors />} allowedTypes={["admin"]} />
          }
        />
        <Route
          path="/admin/feedbacks"
          element={
            <PrivateRoute element={<Feedbacks />} allowedTypes={["admin"]} />
          }
        />
        <Route
          path="/admin/service"
          element={
            <PrivateRoute element={<ServiceList />} allowedTypes={["admin"]} />
          }
        />
        <Route
          path="/admin/sale-items"
          element={
            <PrivateRoute element={<SaleItemList />} allowedTypes={["admin"]} />
          }
        />

        {/* Service center Routes */}
        <Route
          path="/service"
          element={
            <PrivateRoute
              element={<ServiceDashboard />}
              allowedTypes={["service"]}
            />
          }
        />
        <Route
          path="/service/addgrooming"
          element={
            <PrivateRoute
              element={<AddGrooming />}
              allowedTypes={["service"]}
            />
          }
        />
            <Route
          path="/service/petdetails"
          element={
            <PrivateRoute
              element={<PetDetails />}
              allowedTypes={["service"]}
            />
          }
        />
        <Route
          path="/service/addDoctor"
          element={
            <PrivateRoute element={<AddDoctor />} allowedTypes={["service"]} />
          }
        />
        <Route
          path="/service/bookings"
          element={
            <PrivateRoute element={<Bookings />} allowedTypes={["service"]} />
          }
        />
        <Route
          path="/service/addTrainer"
          element={
            <PrivateRoute element={<AddTrainer />} allowedTypes={["service"]} />
          }
        />
        <Route
          path="/service/viewTrainer"
          element={
            <PrivateRoute
              element={<ViewTrainer />}
              allowedTypes={["service"]}
            />
          }
        />
        <Route
          path="/service/editTrainer/:id"
          element={
            <PrivateRoute
              element={<EditTrainer />}
              allowedTypes={["service"]}
            />
          }
        />
      
        <Route
          path="/service/groomingList"
          element={
            <PrivateRoute
              element={<ViewGrooming />}
              allowedTypes={["service"]}
            />
          }
        />
        <Route
          path="/service/editgrooming/:id"
          element={
            <PrivateRoute
              element={<EditGrooming />}
              allowedTypes={["service"]}
            />
          }
        />
        <Route
          path="/service/editDoctor/:id"
          element={
            <PrivateRoute element={<EditDoctor />} allowedTypes={["service"]} />
          }
        />
        <Route
          path="/service/doctorlist"
          element={
            <PrivateRoute
              element={<DoctorsList />}
              allowedTypes={["service"]}
            />
          }
        />
        {/* Seller Routes */}
        <Route
          path="/seller/dashboard"
          element={
            <PrivateRoute
              element={<SellerDashboard />}
              allowedTypes={["seller"]}
            />
          }
        />
        <Route
          path="/seller/addfood"
          element={
            <PrivateRoute element={<AddFood />} allowedTypes={["seller"]} />
          }
        />
        <Route
          path="/seller/viewFood"
          element={
            <PrivateRoute element={<ViewFood />} allowedTypes={["seller"]} />
          }
        />
        <Route
          path="/seller/editfood/:id"
          element={
            <PrivateRoute element={<EditFood />} allowedTypes={["seller"]} />
          }
        />
        <Route
          path="/seller/addmedicine"
          element={
            <PrivateRoute element={<AddMedicine />} allowedTypes={["seller"]} />
          }
        />
        <Route
          path="/seller/viewMedicine"
          element={
            <PrivateRoute
              element={<ViewMedicine />}
              allowedTypes={["seller"]}
            />
          }
        />
        <Route
          path="/seller/editmedicine/:id"
          element={
            <PrivateRoute
              element={<EditMedicine />}
              allowedTypes={["seller"]}
            />
          }
        />
        <Route
          path="/seller/viewAccessories"
          element={
            <PrivateRoute
              element={<ViewAccessories />}
              allowedTypes={["seller"]}
            />
          }
        />
        <Route
          path="/seller/editAccessory/:id"
          element={
            <PrivateRoute
              element={<EditAccessory />}
              allowedTypes={["seller"]}
            />
          }
        />
         <Route
          path="/seller/orders"
          element={
            <PrivateRoute
              element={<OrderList />}
              allowedTypes={["seller"]}
            />
          }
        />
        <Route
          path="/seller/addAccessory"
          element={
            <PrivateRoute
              element={<AddAccessory />}
              allowedTypes={["seller"]}
            />
            
          }
        />
        {/*  */}
        <Route
          path="/seller/sale-items"
          element={
            <PrivateRoute
              element={<SaleItemList />}
              allowedTypes={["seller"]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
