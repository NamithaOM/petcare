import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../util/BaseUrl';
import Sidebar from '../Auth/Sidebar';
import Header from '../Auth/Header';

export default function EditGrooming() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [groomingDetails, setGroomingDetails] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    products: '',
    image: null,
  });

  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroomingDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}viewGrooming/${id}/`);
        const data = await response.json();
        if (response.ok) {
          setGroomingDetails({
            name: data.name || '',
            description: data.description || '',
            duration: data.duration || '',
            price: data.price || '',
            products: data.products || '',
            image: data.photo,  // Get the image URL directly from the response
          });
          setPreviewImage(data.photo); // Set the image URL as the preview
        } else {
          setError(data.error || 'Failed to fetch grooming details');
        }
      } catch (err) {
        setError('Error fetching grooming details');
      }
    };

    fetchGroomingDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroomingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setGroomingDetails((prev) => ({
      ...prev,
      image: file,
    }));
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, duration, price, products, image } = groomingDetails;
    if (!name.trim() || !description.trim() || !duration.trim() || !price.trim() || !products.trim()) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('price', price);
    formData.append('products', products);
    if (image) {
      formData.append('image', image); // Attach the image file
    }

    try {
      const response = await fetch(`${baseUrl}updateGrooming/${id}/`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Grooming updated successfully!');
        navigate('/service/groomingList');
      } else {
        setError(data.error || 'Failed to update grooming details');
      }
    } catch (err) {
      setError('Error updating grooming details');
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Edit Grooming</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="col-md-6">
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name" value={groomingDetails.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" name="description" value={groomingDetails.description} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input type="text" className="form-control" name="duration" value={groomingDetails.duration} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" className="form-control" name="price" value={groomingDetails.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Products</label>
                <input type="text" className="form-control" name="products" value={groomingDetails.products} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                {previewImage && (
                  <div className="mt-2">
                    <img src={baseUrl+previewImage} alt="Preview" width="120" height="100" />
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">Update Grooming</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
