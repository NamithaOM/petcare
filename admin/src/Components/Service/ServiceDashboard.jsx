import React,{useState, useEffect} from 'react'
import Header from '../Auth/Header'
import Sidebar from '../Auth/Sidebar'
import { baseUrl } from '../../util/BaseUrl';

export default function ServiceDashboard() {
    const storedUserId = localStorage.getItem("user_id");
    const [formData, setFormData] = useState({ userid: storedUserId });
    const [doctorBookingsCount, setDoctorBookingsCount] = useState(0);
    const [trainerBookingsCount, setTrainerBookingsCount] = useState(0);
    const [groomingBookingsCount, setGroomingBookingsCount] = useState(0);
    const [doctorsCount, setDoctorsCount] = useState(0);
    const [trainersCount, setTrainersCount] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAllData = async () => {
          await Promise.all([
            fetchDoctorBookings(),
            fetchTrainerBookings(),
            fetchGroomingBookings(),
            fetchDoctors(),
            fetchTrainerDetails(formData.userid),
          ]);
          setLoading(false);
        };
      
        fetchAllData();
      }, []);
      
      

      const fetchDoctorBookings = async () => {
        try {
          const response = await fetch(`${baseUrl}get_doctor_bookings_by_service_center`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid: formData.userid }),
          });
          const data = await response.json();
          if (response.ok) {
            setDoctorBookingsCount(data.bookings?.length || 0);
          }
        } catch (error) {
          console.error("Error fetching doctor bookings:", error);
        }
      };
      
      const fetchTrainerBookings = async () => {
        try {
          const response = await fetch(`${baseUrl}get_trainer_bookings_by_service_center`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid: formData.userid }),
          });
          const data = await response.json();
          if (response.ok) {
            setTrainerBookingsCount(data.bookings?.length || 0);
          }
        } catch (error) {
          console.error("Error fetching trainer bookings:", error);
        }
      };
      
      const fetchGroomingBookings = async () => {
        try {
          const response = await fetch(`${baseUrl}get_grooming_bookings_by_service_center`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid: formData.userid }),
          });
          const data = await response.json();
          if (response.ok) {
            setGroomingBookingsCount(data.bookings?.length || 0);
          }
        } catch (error) {
          console.error("Error fetching grooming bookings:", error);
        }
      };
      
      const fetchDoctors = async () => {
        try {
          const response = await fetch(`${baseUrl}listDoctors/`);
          const data = await response.json();
          if (response.ok) {
            setDoctorsCount(data.length || 0);
          }
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };
      
      const fetchTrainerDetails = async (id) => {
        try {
          const response = await fetch(`${baseUrl}viewTrainersByUser/${id}/`);
          const data = await response.json();
          if (response.ok) {
            setTrainersCount(data.length || 0);
          }
        } catch (error) {
          console.error("Error fetching trainers:", error);
        }
      };
      
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

            
                        <div className="col-xl-4 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Doctor Bookings</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{doctorBookingsCount}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                
                        <div className="col-xl-4 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Trainer Bookings</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{trainerBookingsCount}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                 
                        <div className="col-xl-4 col-md-6 mb-4">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Grooming
                                            </div>
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{groomingBookingsCount}</div>
                                                </div>
                                                <div className="col">
                                                    <div className="progress progress-sm mr-2">
                                                        <div className="progress-bar bg-info" role="progressbar"
                                                            // style={{"width: 50%" aria-valuenow="50" aria-valuemin="0"
                                                            // aria-valuemax="100"}}
                                                            ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                       
                        <div className="col-xl-4 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Doctors</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{doctorsCount}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Trainers</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{trainersCount}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>
                    
            </div>
          </div>
        </div>
  )
}
