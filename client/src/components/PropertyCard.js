import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import EditPropertyModal from './EditPropertyModal';

const PropertyCard = ({ property }) => {
  const { setSelectedProperty, deleteProperty } = useProperty();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProperty(property._id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="property-card">
        <div className="card-image">
          <img src={property.image} alt={property.name} />
          <div className="card-actions">
            <button 
              className="action-btn edit-btn"
              onClick={() => setShowEditModal(true)}
              title="Edit Property"
            >
              ✏️
            </button>
            <button 
              className="action-btn delete-btn"
              onClick={() => setShowDeleteConfirm(true)}
              title="Delete Property"
            >
              🗑️
            </button>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="card-title">{property.name}</h3>
          <p className="card-price">₹ {property.price.toLocaleString()}</p>
          <p className="card-location">📍 {property.location}</p>
          <p className="card-type">{property.type}</p>
          <p className="card-date">Added: {formatDate(property.createdAt)}</p>
          
          <div className="card-buttons">
            <button 
              className="view-btn"
              onClick={() => setSelectedProperty(property)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditPropertyModal
          property={property}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h2>🗑️ Delete Property</h2>
              <p>Are you sure you want to delete "{property.name}"?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-danger"
                onClick={handleDelete}
              >
                Delete Property
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyCard; 