// Mock API service using localStorage
const MOCK_PROPERTIES_KEY = 'mock_properties';

// Initialize with sample data if empty
const initializeMockData = () => {
  const existingData = localStorage.getItem(MOCK_PROPERTIES_KEY);
  if (!existingData) {
    const sampleProperties = [
      {
        _id: '1',
        name: 'Luxury Apartment in City Center',
        type: 'Apartment',
        price: 2500000,
        location: 'Mumbai, Maharashtra',
        description: 'Beautiful 3BHK apartment with modern amenities, located in the heart of the city with easy access to metro and shopping centers.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop',
        createdAt: new Date('2024-01-15').toISOString()
      },
      {
        _id: '2',
        name: 'Modern Villa with Garden',
        type: 'Villa',
        price: 8500000,
        location: 'Pune, Maharashtra',
        description: 'Spacious 4BHK villa with private garden, swimming pool, and modern kitchen. Perfect for large families.',
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=300&fit=crop',
        createdAt: new Date('2024-01-20').toISOString()
      },
      {
        _id: '3',
        name: 'Cozy Studio Apartment',
        type: 'Studio',
        price: 1200000,
        location: 'Bangalore, Karnataka',
        description: 'Compact and well-designed studio apartment ideal for young professionals. Includes basic amenities.',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop',
        createdAt: new Date('2024-01-25').toISOString()
      },
      {
        _id: '4',
        name: 'Premium Condo with City View',
        type: 'Condo',
        price: 4500000,
        location: 'Delhi, NCR',
        description: 'High-rise condo with panoramic city views, gym, and 24/7 security. Perfect for urban living.',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop',
        createdAt: new Date('2024-01-30').toISOString()
      },
      {
        _id: '5',
        name: 'Family House in Suburbs',
        type: 'House',
        price: 6500000,
        location: 'Chennai, Tamil Nadu',
        description: 'Spacious family house with 5 bedrooms, large backyard, and parking for 3 cars. Great for growing families.',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
        createdAt: new Date('2024-02-01').toISOString()
      }
    ];
    localStorage.setItem(MOCK_PROPERTIES_KEY, JSON.stringify(sampleProperties));
  }
};

// Get all properties
export const getProperties = async () => {
  initializeMockData();
  const properties = localStorage.getItem(MOCK_PROPERTIES_KEY);
  return JSON.parse(properties || '[]');
};

// Get single property by ID
export const getPropertyById = async (id) => {
  const properties = await getProperties();
  return properties.find(prop => prop._id === id);
};

// Create new property
export const createProperty = async (propertyData) => {
  const properties = await getProperties();
  const newProperty = {
    ...propertyData,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  const updatedProperties = [...properties, newProperty];
  localStorage.setItem(MOCK_PROPERTIES_KEY, JSON.stringify(updatedProperties));
  
  return newProperty;
};

// Update property
export const updateProperty = async (id, propertyData) => {
  const properties = await getProperties();
  const updatedProperties = properties.map(prop => 
    prop._id === id 
      ? { ...prop, ...propertyData, updatedAt: new Date().toISOString() }
      : prop
  );
  
  localStorage.setItem(MOCK_PROPERTIES_KEY, JSON.stringify(updatedProperties));
  
  return updatedProperties.find(prop => prop._id === id);
};

// Delete property
export const deleteProperty = async (id) => {
  const properties = await getProperties();
  const updatedProperties = properties.filter(prop => prop._id !== id);
  localStorage.setItem(MOCK_PROPERTIES_KEY, JSON.stringify(updatedProperties));
  
  return { success: true, message: 'Property deleted successfully' };
};

// Search properties
export const searchProperties = async (query) => {
  const properties = await getProperties();
  const searchTerm = query.toLowerCase();
  
  return properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm) ||
    property.location.toLowerCase().includes(searchTerm) ||
    property.description.toLowerCase().includes(searchTerm) ||
    property.type.toLowerCase().includes(searchTerm)
  );
};

// Filter properties by type
export const filterPropertiesByType = async (type) => {
  const properties = await getProperties();
  if (!type) return properties;
  
  return properties.filter(property => 
    property.type.toLowerCase() === type.toLowerCase()
  );
}; 