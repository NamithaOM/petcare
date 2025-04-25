import React, { useEffect, useState } from "react";
import Header from "../Auth/Header";
import Sidebar from "../Auth/Sidebar";
import { baseUrl } from "../../util/BaseUrl";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [items, setItems] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(baseUrl + "allDoctors/")
      .then((res) => res.json())
      .then((data) => setDoctors(data.Doctors || []))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  useEffect(() => {
    fetch(baseUrl + "allTrainers/")
      .then((res) => res.json())
      .then((data) => setTrainers(data.Trainers || []))
      .catch((err) => console.error("Error fetching trainers:", err));
  }, []);

  useEffect(() => {
    fetch(baseUrl + "allusers/")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    fetchPets();
    fetchItems();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch(baseUrl + "list_pets/");
      const data = await response.json();
      setPets(data.pets || []);
    } catch (error) {
      setMessage("Error fetching pets");
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`${baseUrl}list_Item/`);
      if (!response.ok) throw new Error("Failed to fetch items");
      const data = await response.json();
      setItems(data.StoreItems || []);
    } catch (error) {
      console.error("Error fetching items:", error);
      setMessage("Error fetching items");
    }
  };

  useEffect(() => {
    fetch(`${baseUrl}list_servicename/`)
      .then((res) => res.json())
      .then((data) => setServices(data.servicename || []))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>

            <div className="row">
              {/* Doctors */}
              <DashboardCard title="Doctors" count={doctors.length} icon="fas fa-user-md" color="primary" />
              {/* Trainers */}
              <DashboardCard title="Trainers" count={trainers.length} icon="fas fa-dumbbell" color="success" />
              {/* Users */}
              <DashboardCard title="Staffs" count={users.length} icon="fas fa-users" color="info" />
              {/* Pets */}
              <DashboardCard title="Pets" count={pets.length} icon="fas fa-dog" color="warning" />
              {/* Sale Items */}
              <DashboardCard title="Sale Items" count={items.length} icon="fas fa-shopping-cart" color="danger" />
              {/* Services */}
              <DashboardCard title="Services" count={services.length} icon="fas fa-concierge-bell" color="secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Card Component
function DashboardCard({ title, count, icon, color }) {
  return (
    <div className="col-xl-4 col-md-6 mb-4">
      <div className={`card border-left-${color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{count}</div>
            </div>
            <div className="col-auto">
              <i className={`${icon} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
