import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ServerUrl from "../CommonComponents/ServerUrl";
import defaultProfilePicture from "../AdminComponents/img/default_profile_picture.PNG";

function AdminSidebar() {
  const authRaw = localStorage.getItem("user");
  const [auth, setAuth] = useState(authRaw ? JSON.parse(authRaw) : null);

  console.log(auth);
  useEffect(() => {
    const handleStorageUpdate = () => {
      const updated = localStorage.getItem("user");
      setAuth(updated ? JSON.parse(updated) : null);
    };

    window.addEventListener("userDataUpdated", handleStorageUpdate);

    return () => {
      window.removeEventListener("userDataUpdated", handleStorageUpdate);
    };
  }, []);

  return (
    <>
      {/* Sidebar Start */}
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-light">
          <Link to="/" className="navbar-brand mx-4 mb-3">
            <h3 className="">
              <i className="" />
              AUTO LEAD
            </h3>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle"
                src={
                  auth?.regId?.image
                    ? ServerUrl + auth.regId.image
                    : defaultProfilePicture
                }
                alt="Profile"
                style={{
                  width: 40,
                  height: 40,
                  objectFit: "cover",
                  objectPosition: "center",
                  border: "2px solid #ddd",
                }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
            </div>
            <div className="ms-3">
              {auth == null ? (
                <>
                  <h6 className="mb-0">Anandan</h6>
                  <span>Admin</span>
                </>
              ) : auth.usertype == 1 ? (
                <>
                  <h6 className="mb-0">{auth.regId.name}</h6>
                  <span>Customer Service</span>
                </>
              ) : auth.usertype == 2 ? (
                <>
                  <h6 className="mb-0">{auth.regId.name}</h6>
                  <span>Sales Representative</span>
                </>
              ) : null}
            </div>
          </div>
          <div className="navbar-nav w-100">
            {auth == null ? (
              <>
                <Link to="/adminmain" className="nav-item nav-link">
                  <i className="fa fa-tachometer-alt me-2" />
                  Dashboard
                </Link>
                <Link to="/adminusercontrols" className="nav-item nav-link">
                  <i className="fa fa-user-shield me-2" />
                  Approve/Reject
                </Link>
                <Link to="/admincustomerspanel" className="nav-item nav-link">
                  <i className="fa fa-user-friends me-2" />
                  Customers
                </Link>
                <Link to="/adminsupportpanel" className="nav-item nav-link">
                  <i className="fa fa-headset me-2" />
                  Customer Support
                </Link>
                <Link to="/adminsalespanel" className="nav-item nav-link">
                  <i className="fa fa-chart-line me-2" />
                  Sales Team
                </Link>
              </>
            ) : auth.usertype == 1 ? (
              <>
                <Link to="/adminmain" className="nav-item nav-link">
                  <i className="fa fa-tachometer-alt me-2" />
                  Dashboard
                </Link>
                <Link to="/supporttickets" className="nav-item nav-link">
                  <i className="fa fa-ticket-alt me-2" />
                  Support Tickets
                </Link>
                <Link to="/enquiries" className="nav-item nav-link">
                  <i className="fas fa-envelope-open-text me-2" />
                  Public Enquiries
                </Link>
              </>
            ) : auth.usertype == 2 ? (
              <>
                <Link to="/adminmain" className="nav-item nav-link">
                  <i className="fa fa-tachometer-alt me-2" />
                  Dashboard
                </Link>
                <Link to="/leadform" className="nav-item nav-link">
                  <i className="fa fa-sticky-note me-2" />
                  Lead Creation
                </Link>
                <Link to="/admincustomerspanel" className="nav-item nav-link">
                  <i className="fa fa-user-friends me-2" />
                  Customers
                </Link>
                <Link to="/adminsupportpanel" className="nav-item nav-link">
                  <i className="fa fa-headset me-2" />
                  Customer Support
                </Link>
              </>
            ) : null}
          </div>
        </nav>
      </div>
      {/* Sidebar End */}
    </>
  );
}

export default AdminSidebar;
