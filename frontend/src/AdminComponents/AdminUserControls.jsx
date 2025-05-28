import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';

function AdminUserControls() {

  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const userType = { 1: "Customer Support", 2: "Sales Representative" };

  const userStatus = { "pending": <td>Pending</td>, "approved": <td className='text-success'>Approved</td>, "rejected": <td className='text-danger'>Rejected</td> };
  
  const actionButton = (data) => ({
    'rejected': (
      <Link className="btn btn-sm btn-success" to="#" onClick={() => handleStatusUpdate(data._id, 'approved')}>Approve</Link>
    ),
    'approved': (
      <Link className="btn btn-sm btn-danger" to="#" onClick={() => handleStatusUpdate(data._id, 'rejected')}>Reject</Link>
    ),
    'pending': (
      <>
        <Link className="btn btn-sm btn-success" to="#" onClick={() => handleStatusUpdate(data._id, 'approved')}>Approve</Link>&nbsp;&nbsp;
        <Link className="btn btn-sm btn-danger" to="#" onClick={() => handleStatusUpdate(data._id, 'rejected')}>Reject</Link>
      </>
    )
  });

  // handleStatusUpdate function to post status change
  const handleStatusUpdate = (_id, newStatus) => {
    let param = {
      _id, // Use _id directly
      status: newStatus,
    };

    fetch('http://localhost:4000/auth/updateuserstatus', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setRefresh((prev) => prev + 1); // Trigger re-fetch
    })
    .catch((err) => console.error('Error:', err));
  };

  useEffect(() => {
    fetch('http://localhost:4000/fetch/approvalusers')
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUsers(result);
      })
      .catch((err) => console.log(err));
  }, [refresh]); // Depend on refresh to trigger re-fetch

  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminNavbar />
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">List Of Users</h6>
            </div>
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-dark">
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">User Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((data, index) => (
                    <tr key={index}>
                      <td>{data.regId.name}</td>
                      <td>{data.email}</td>
                      <td>{data.regId.phone}</td>
                      <td>{userType[data.usertype]}</td>
                      <td>{userStatus[data.regId.status]}</td>
                      <td>{actionButton(data)[data.regId.status]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUserControls;
