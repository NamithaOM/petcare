import React, { useState, useEffect } from "react";
import Header from "../Auth/Header";
import Sidebar from "../Auth/Sidebar";
import { baseUrl } from "../../util/BaseUrl";

export default function SaleItemList() {
  const [formData, setFormData] = useState({ itemname: "", itemimage: null });

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${baseUrl}list_Item/`);
      if (!response.ok) throw new Error("Failed to fetch items");
      const data = await response.json();

      // Assuming data contains a key `StoreItems` that holds the array
      setItems(data.StoreItems || []); // Use the array inside StoreItems key or an empty array if not present
      console.log(data); // Log the data to confirm the structure
    } catch (error) {
      console.error("Error fetching items:", error);
      setMessage("Error fetching items");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "itemimage") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("itemname", formData.itemname);
    form.append("itemimage", formData.itemimage);
  
    try {
      const response = await fetch(`${baseUrl}create_Item/`, {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchItems();
        setFormData({ itemname: "", itemimage: null });
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting item");
    }
  };
  

 const handleUpdate = async (id, itemname, itemimage = null) => {
  const form = new FormData();
  form.append("itemname", itemname);
  if (itemimage) form.append("itemimage", itemimage);

  try {
    const response = await fetch(`${baseUrl}update_Item/${id}/`, {
      method: "POST",
      body: form,
    });
    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      fetchItems();
    } else {
      setMessage(data.error);
    }
  } catch (error) {
    console.error("Error updating item:", error);
    setMessage("Error updating item");
  }
};


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}delete_Item/${id}/`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchItems();
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage("Error deleting item");
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
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      id="itemimage"
                      name="itemimage"
                      value={formData.itemimage}
                      onChange={handleChange}
                    
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </form>
              </div>
              {message && (
                <div className="alert alert-info mt-2">{message}</div>
              )}
              <div className="row">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Store Items
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <tr key={item.id}>
                              <td>
                                {item.itemimage ? (
                                  <img
                                    src={baseUrl +"media/"+ item.itemimage}
                                    alt={item.itemname}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  "No Image"
                                )}
                              </td>

                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={item.itemname}
                                  onBlur={(e) =>
                                    handleUpdate(item.id, e.target.value)
                                  }
                                />
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={(e) =>
                                    handleUpdate(
                                      item.id,
                                      item.itemname,
                                      e.target.files[0]
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(item.id)}
                                >
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
