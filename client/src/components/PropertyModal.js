import React from 'react';
import { useProperty } from '../context/PropertyContext';

const PropertyModal = () => {
  const { selectedProperty, setSelectedProperty } = useProperty();

  if (!selectedProperty) return null;

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedProperty(null);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content">
        <button className="modal-close" onClick={() => setSelectedProperty(null)}>
          ✕
        </button>
        
        <div className="modal-image">
          <img src={selectedProperty.image} alt={selectedProperty.name} />
        </div>
        
        <div className="modal-details">
          <h2 className="modal-title">{selectedProperty.name}</h2>
          <p className="modal-description">{selectedProperty.description}</p>
          
          <div className="modal-info">
            <div className="info-item">
              <span className="info-label">Type:</span>
              <span className="info-value">{selectedProperty.type}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">📍 {selectedProperty.location}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Price:</span>
              <span className="info-value price">₹ {selectedProperty.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal; 