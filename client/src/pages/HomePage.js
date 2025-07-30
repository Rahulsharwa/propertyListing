import React, { useState, useEffect } from 'react';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import PropertyModal from '../components/PropertyModal';

const HomePage = () => {
  const { properties, loading, error, clearError } = useProperty();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Filter and search properties
  useEffect(() => {
    let filtered = properties.filter(property => {
      const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === '' || property.type.toLowerCase() === filterType.toLowerCase();
      
      return matchesSearch && matchesType;
    });

    // Sort properties
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    setFilteredProperties(filtered);
  }, [properties, searchTerm, filterType, sortBy]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>🏘 Property Dashboard</h1>
        <p>Manage and explore your property listings with full CRUD operations</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="error-alert">
          <span>⚠️ {error}</span>
          <button onClick={clearError} className="error-close">✕</button>
        </div>
      )}

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search properties by name, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Studio">Studio</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="date">Newest First</option>
          </select>
        </div>
      </div>

      <div className="results-info">
        <p>
          Showing {filteredProperties.length} of {properties.length} properties
          {searchTerm && ` for "${searchTerm}"`}
          {filterType && ` (${filterType} type)`}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading properties...</p>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredProperties.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🏠</div>
          <h3>No properties found</h3>
          <p>
            {searchTerm || filterType 
              ? 'Try adjusting your search criteria or filters.'
              : 'No properties available. Add your first property to get started!'
            }
          </p>
        </div>
      )}

      {/* Properties Grid */}
      {!loading && filteredProperties.length > 0 && (
        <div className="properties-grid">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}

      {/* Property Details Modal */}
      <PropertyModal />
    </div>
  );
};

export default HomePage; 