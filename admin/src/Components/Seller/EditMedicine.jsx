import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";

export default function EditMedicine() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [formData, setFormData] = useState({
        medicine_name: "",
        brand: "",
        price: "",
        dosage: "",
        usage_instructions: "",
        manufacture_date: "",
        expiry_date: "",
        petid: "",
        stock: "",
        count: "",
        userid: "",
        image: null,
    });

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
            setFormData((prevData) => ({ ...prevData, userid: storedUserId }));
        }
        fetchMedicine();
        fetchPets();
    }, []);

    const fetchMedicine = async () => {
        try {
            const response = await fetch(baseUrl + `getmedicine/${id}`);
            const data = await response.json();
            if (data) {
                setFormData({
                    medicine_name: data.medicine_name,
                    brand: data.brand,
                    price: data.price,
                    dosage: data.dosage,
                    usage_instructions: data.usage_instructions,
                    manufacture_date: data.manufacture_date,
                    expiry_date: data.expiry_date,
                    petid: data.petid,
                    stock: data.stock,
                    count: data.count,
                    image: null,
                    userid: data.userid,
                });
            }
        } catch (error) {
            console.error("Failed to fetch medicine details:", error);
        }
    };

    const fetchPets = async () => {
        try {
            const response = await fetch(baseUrl + "list_pets/");
            const data = await response.json();
            setPets(data.pets || []);
        } catch (error) {
            console.error("Failed to fetch pets:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData, count: formData.stock };
        const formDataToSend = new FormData();
        for (let key in updatedFormData) {
            formDataToSend.append(key, updatedFormData[key]);
        }
        try {
            const response = await fetch(baseUrl + `updatemedicine/${id}/`, {
                method: "POST",
                body: formDataToSend,
            });
            const data = await response.json();
            if (data.message === "Medicine updated successfully") {
                setSuccessMsg("Medicine updated successfully!");
                setTimeout(() => {
                    navigate("/seller/viewMedicine");
                }, 1500);
            } else {
                alert(data.error || "Update failed");
            }
        } catch (error) {
            alert("Error connecting to the server");
        }
    };

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Header />
                    <div className="container-fluid">
                        <h3 className="mb-4">Edit Medicine</h3>
                        {successMsg && <div className="alert alert-success">{successMsg}</div>}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-group">
                                <label>Select Pet</label>
                                <select name="petid" className="form-control" value={formData.petid} onChange={handleChange} required>
                                    <option value="">-- Select --</option>
                                    {pets.map((pet) => (
                                        <option key={pet.id} value={pet.id}>{pet.petname}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label>Medicine Name</label>
                                    <input type="text" name="medicine_name" className="form-control" value={formData.medicine_name} onChange={handleChange} required />
                                </div>
                                <div className="form-group col-6">
    <label>Brand</label>
    <input type="text" name="brand" className="form-control" value={formData.brand} onChange={handleChange} required />
</div>

                                    <div className="form-group col-6">
    <label>Price (₹)</label>
    <input type="text" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
</div>
</div>
<div className="form-row">
<div className="form-group col-6">
    <label>Dosage</label>
    <input type="text" name="dosage" className="form-control" value={formData.dosage} onChange={handleChange} required />
</div>
<div className="form-group col-6">
    <label>Usage Instructions</label>
    <input type="text" name="usage_instructions" className="form-control" value={formData.usage_instructions} onChange={handleChange} required />
</div>
</div>
<div className="form-row">
<div className="form-group col-6">
    <label>Manufacture Date</label>
    <input type="date" name="manufacture_date" className="form-control" value={formData.manufacture_date} onChange={handleChange} required />
</div>
<div className="form-group col-6">
    <label>Expiry Date</label>
    <input type="date" name="expiry_date" className="form-control" value={formData.expiry_date} onChange={handleChange} required />
</div>
</div>
<div className="form-row">
<div className="form-group col-6">
    <label>Stock</label>
    <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} required />
</div>
<div className="form-group col-6">
    <label>Update Image</label>
    {formData.image && (
        typeof formData.image === "string" ? (
            <img src={`${baseUrl}${formData.image.startsWith("/") ? formData.image.slice(1) : formData.image}`} width="100" height="100" alt="Current Medicine" style={{ objectFit: 'cover', marginBottom: '10px' }} />
        ) : (
            <img src={URL.createObjectURL(formData.image)} width="100" height="100" alt="Selected Preview" style={{ objectFit: 'cover', marginBottom: '10px' }} />
        )
    )}
    <input type="file" name="image" className="form-control-file" onChange={handleFileChange} accept="image/*" />
</div>
</div>
<button type="submit" className="btn btn-primary mt-3">Update</button>
</form>
</div>
</div>
</div>
</div>
);
}