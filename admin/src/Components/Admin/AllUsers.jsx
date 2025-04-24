import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Auth/Sidebar';
import Header from '../Auth/Header';
import { baseUrl } from '../../util/BaseUrl';

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + 'allusers/')
      .then((res) => res.json())
      .then((data) => setUsers(data.users))  // ✅ key was 'users'
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleBlock = (userId) => {
    fetch(baseUrl + `blockuser/${userId}/`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        // Refresh list
        setUsers(users.map(user => 
          user.id === userId ? { ...user, is_active: 0 } : user
        ));
      });
  };

  const handleDelete = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    fetch(baseUrl + `deleteuser/${userId}/`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        // Remove user from list
        setUsers(users.filter(user => user.id !== userId));
      });
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">User List</h1>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>User Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.contact}</td>
                        <td>{user.usertype}</td>
                        <td>{user.is_active === false ? 'Blocked' : 'Active'}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm mr-2"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-dark btn-sm"
                            onClick={() => handleBlock(user.id)}
                            disabled={user.is_active === 0}
                          >
                            Block
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center">No users found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
