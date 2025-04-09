import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapPin, ImageIcon } from "lucide-react";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://propques-space-backend-i8etb.ondigitalocean.app/api/properties/")
      .then((res) => {
        const data = res.data;
        setProperties(data);

        // Get unique cities and set default city to the first one available
        const cities = [...new Set(data.map((p) => p.cityName))];
        setUniqueCities(cities);
        if (cities.length > 0) {
          setSelectedCity(cities[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter properties based on selected city
  const filteredProperties = properties.filter(
    (p) => p.cityName === selectedCity
  );

  // Navigate to details page on card click
  const handleCardClick = (id) => {
    navigate(`/properties/${id}`);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">

      <div className="flex gap-2 items-center justify-between md:justify-normal sm:space-x-2 mb-4">
        <label htmlFor="city" className="font-semibold text-gray-700 mb-2  sm:mb-0">
          Select City:
        </label>
        <select
          id="city"
          className="border border-gray-300 rounded-full px-4 py-2 w-32"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            onClick={() => handleCardClick(property._id)}
            className="cursor-pointer border border-gray-200 rounded p-4 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-full md:w-1/2">
              {property.thumbnails ? (
                <img
                  src={property.thumbnails}
                  alt={property.name}
                  className="w-full h-[400px] object-cover rounded"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded">
                  <ImageIcon className="text-gray-400 md:w-8 md:h-8 h-20" />
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-[#20B1EE]">
                  {property.name}
                </h2>
                <p className="mt-2 text-gray-500 flex items-center text-sm">
                  <MapPin className="mr-2 w-5 h-5" />
                  {property.address}
                </p>
              </div>
              <div className="mt-4">
                {property.details?.mapLocation && (
                  <div className="w-full">
                    <iframe
                      src={property.details.mapLocation}
                      frameBorder="0"
                      className="w-full h-64 rounded"
                      title="Map"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
