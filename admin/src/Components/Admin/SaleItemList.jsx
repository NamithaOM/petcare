import React, { useState, useEffect } from 'react';
import Header from '../Auth/Header';
import Sidebar from '../Auth/Sidebar';
import { baseUrl } from "../../util/BaseUrl";

export default function SaleItemList() {
  const [formData, setFormData] = useState({ itemname: '' });
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${baseUrl}list_Item/`);
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      
      // Assuming data contains a key `StoreItems` that holds the array
      setItems(data.StoreItems || []); // Use the array inside StoreItems key or an empty array if not present
      console.log(data); // Log the data to confirm the structure
      
    } catch (error) {
      console.error('Error fetching items:', error);
      setMessage('Error fetching items');
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}create_Item/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchItems();
        setFormData({ itemname: '' });
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error submitting item');
    }
  };

  const handleUpdate = async (id, newItemName) => {
    if (!newItemName.trim()) return; // Prevent empty updates
    try {
      const response = await fetch(`${baseUrl}update_Item/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemname: newItemName }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchItems();
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setMessage('Error updating item');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}delete_Item/${id}/`, { method: 'DELETE' });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchItems();
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setMessage('Error deleting item');
    }
  };

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Store Item List</h1>
              </div>
              <div className="row mb-5">
                <form className="storeitems col-6" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="itemname"
                      name="itemname"
                      value={formData.itemname}
                      onChange={handleChange}
                      placeholder="Enter Sale Item"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </form>
              </div>
              {message && <div className="alert alert-info mt-2">{message}</div>}
              <div className="row">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Store Items</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={item.itemname}
                                  onBlur={(e) => handleUpdate(item.id, e.target.value)}
                                />
                              </td>
                              <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                          {items.length === 0 && (
                            <tr>
                              <td colSpan="2" className="text-center">
                                No items found
                              </td>
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
        </div>
      </div>
    </>
  );
}
