import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Coworking Centers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map(property => (
          <Link key={property._id} to={`/properties/${property._id}`}>
            {console.log(property.details.carouselImages[0])}
            <div className="border rounded p-4 shadow hover:shadow-lg transition">
              {property.details.carouselImages[0] ? (
                <img 
                  src={property.details.carouselImages[0]                  } 
                  alt={property.name} 
                  className="w-full h-40 object-cover rounded mb-2" 
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-2">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <h2 className="text-xl font-semibold">{property.name}</h2>
              <p>{property.cityName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
