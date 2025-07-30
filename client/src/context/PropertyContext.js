import { createContext, useContext, useState, useEffect } from "react";
import * as api from '../utils/api';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all properties
  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProperties();
      setProperties(data);
    } catch (err) {
      setError('Failed to fetch properties');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new property
  const addProperty = async (propertyData) => {
    setLoading(true);
    setError(null);
    try {
      const newProperty = await api.createProperty(propertyData);
      setProperties(prev => [...prev, newProperty]);
      return newProperty;
    } catch (err) {
      setError('Failed to add property');
      console.error('Error adding property:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update property
  const updateProperty = async (id, propertyData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProperty = await api.updateProperty(id, propertyData);
      setProperties(prev => 
        prev.map(prop => prop._id === id ? updatedProperty : prop)
      );
      return updatedProperty;
    } catch (err) {
      setError('Failed to update property');
      console.error('Error updating property:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete property
  const deleteProperty = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteProperty(id);
      setProperties(prev => prev.filter(prop => prop._id !== id));
      if (selectedProperty && selectedProperty._id === id) {
        setSelectedProperty(null);
      }
      return { success: true };
    } catch (err) {
      setError('Failed to delete property');
      console.error('Error deleting property:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Search properties
  const searchProperties = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const results = await api.searchProperties(query);
      return results;
    } catch (err) {
      setError('Failed to search properties');
      console.error('Error searching properties:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get property by ID
  const getPropertyById = async (id) => {
    try {
      const property = await api.getPropertyById(id);
      return property;
    } catch (err) {
      console.error('Error getting property by ID:', err);
      return null;
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ 
      properties, 
      selectedProperty,
      loading,
      error,
      addProperty, 
      updateProperty,
      deleteProperty,
      searchProperties,
      getPropertyById,
      setSelectedProperty,
      fetchProperties,
      clearError
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => useContext(PropertyContext); 