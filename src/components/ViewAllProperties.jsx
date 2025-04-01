import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewAllProperties = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/locations')
      .then(res => setCities(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 flex flex-wrap gap-6">
      {console.log(cities)  }
      {cities.map(city =>
        city.subLocations.map(center => (
          <Link
            to={`/city/${city.cityName}/center/${center._id}`}
            key={center._id}
            className="block w-80 bg-white border rounded shadow hover:shadow-lg transition"
          >
            <img src={center.imageUrl} alt={center.name} className="w-full h-48 object-cover rounded-t" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{center.name}</h2>
              <p className="text-sm text-gray-500">{center.address}</p>
              <p className="mt-2 text-sm text-gray-700">{center.details?.propertyDetails}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ViewAllProperties;
