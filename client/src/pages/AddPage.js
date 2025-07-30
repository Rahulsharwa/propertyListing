import React from 'react';
import AddPropertyForm from '../components/AddPropertyForm';

const AddPage = () => {
  return (
    <div className="add-page">
      <div className="page-header">
        <h1>➕ Add New Property</h1>
        <p>Fill in the details below to add a new property to our listings</p>
      </div>
      
      <div className="form-container">
        <AddPropertyForm />
      </div>
    </div>
  );
};

export default AddPage; 