import React, { useState, useEffect } from 'react';
import { useProperty } from '../context/PropertyContext';

const EditPropertyModal = ({ property, onClose, onSuccess }) => {
  const { updateProperty, loading } = useProperty();
  const [form, setForm] = useState({
    name: '',
    type: '',
    price: '',
    location: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (property) {
      setForm({
        name: property.name || '',
        type: property.type || '',
        price: property.price || '',
        location: property.location || '',
        description: property.description || '',
        image: property.image || '',
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const propertyData = {
        ...form,
        price: parseInt(form.price)
      };
      
      await updateProperty(property._id, propertyData);
      onSuccess && onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property. Please try again.');
    }
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!property) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content edit-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="modal-header">
          <h2>✏️ Edit Property</h2>
          <p>Update the property details below</p>
        </div>
        
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-name">Property Name *</label>
              <input
                type="text"
                id="edit-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter property name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-type">Property Type *</label>
              <select
                id="edit-type"
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select property type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Studio">Studio</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-price">Price (₹) *</label>
              <input
                type="number"
                id="edit-price"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="Enter price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-location">Location *</label>
              <input
                type="text"
                id="edit-location"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-image">Image URL *</label>
            <input
              type="url"
              id="edit-image"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              placeholder="Enter image URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description *</label>
            <textarea
              id="edit-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter property description"
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPropertyModal; 