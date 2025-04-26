import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import useAuth to access logout function

export default function Sidebar() {
  const { logout, user } = useAuth();
  const userType = user?.userType;  // Ensure this is correctly getting the user type
  
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <>
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Pet Care <sup>2025</sup></div>
        </Link>

        <hr className="sidebar-divider my-0" />

        {/* Dashboard link for all users */}
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Addons</div>

        {/* Conditional routes based on userType */}
        {userType === "admin" && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/service">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Services</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/sale-items">
                <i className="fas fa-fw fa-table"></i>
                <span>Store Items</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/pets">
                <i className="fas fa-fw fa-dog"></i>
                <span>Pet Category</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/staffs">
                <i className="fas fa-fw fa-user"></i>
                <span>Staffs</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/doctors">
                <i className="fas fa-fw fa-user-md"></i>
                <span>Doctors</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/trainers">
                <i className="fas fa-fw fa-user"></i>
                <span>Trainers</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/feedbacks">
                <i className="fas fa-fw fa-user"></i>
                <span>Feedbacks</span>
              </Link>
            </li>
            
          </>
        )}

        {userType === "seller" && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/seller/sale-items">
                <i className="fas fa-fw fa-table"></i>
                <span>Store Items</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/seller/viewFood">
                <i className="fas fa-fw fa-database"></i>
                <span>Food Items</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/seller/viewMedicine">
                <i className="fas fa-fw fa-medkit"></i>
                <span>Medicines</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/seller/viewAccessories">
                <i className="fas fa-fw fa-pie-chart"></i>
                <span>Accessory</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/seller/orders">
                <i className="fas fa-fw fa-cart-shopping"></i>
                <span>Order List</span>
              </Link>
            </li>
          
          </>
        )}

        {userType === "service" && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/service">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/bookings">
                <i className="fas fa-fw fa-pie-chart"></i>
                <span>Bookings</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/viewTrainer">
                <i className="fas fa-fw fa-dumbbell"></i>
                <span>Trainer</span>
              </Link>
            </li>
        
            
            <li className="nav-item">
              <Link className="nav-link" to="/service/doctorlist">
                <i className="fas fa-fw fa-user-md"></i>
                <span>Doctor</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/groomingList">
                <i className="fas fa-fw fa-paw"></i>
                <span>Grooming List</span>
              </Link>
            </li>
            
          </>
        )}

        {/* Logout menu item */}
        {/* <li className="nav-item">
          <button className="nav-link" onClick={handleLogout}>
            <i className="fas fa-fw fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </li> */}
      </ul>
    </>
  );
}
