import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapPin,
  Navigation,
  ExternalLink,
  User,
  Globe,
  Building2,
} from "lucide-react";

export default function LocationFilter() {
  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/locations")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setLocations(data);
          // Default city: first in the array
          const defaultCity = data[0];
          setSelectedCity(defaultCity);
          // Default sublocation: first sublocation of that city
          if (defaultCity.subLocations && defaultCity.subLocations.length > 0) {
            setSelectedSub(defaultCity.subLocations[0]);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  const handleCityChange = (e) => {
    const cityObj = locations.find((loc) => loc.cityName === e.target.value);
    setSelectedCity(cityObj);
    // Reset selected sublocation to first sublocation of the chosen city
    if (cityObj && cityObj.subLocations && cityObj.subLocations.length > 0) {
      setSelectedSub(cityObj.subLocations[0]);
    } else {
      setSelectedSub(null);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* City Dropdown */}
      <div className="mb-6 flex items-center gap-3">
        {/* <label className="text-sm font-medium flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Select City
        </label> */}
        <select
          className=" p-2 rounded text-xl outline-none"
          value={selectedCity?.cityName || ""}
          onChange={handleCityChange}
        >
          {locations.map((city) => (
            <option key={city._id} value={city.cityName} className="text-sm">
              <p className="text-sm">{city.cityName}</p>
            </option>
          ))}
        </select>

        {/* Sublocation Buttons (shown directly) */}
        {selectedCity && selectedCity.subLocations && (
          <div className="flex flex-wrap gap-2 justify-end ml-20">
            {selectedCity.subLocations.map((sub) => (
              <button
                key={sub._id}
                onClick={() => setSelectedSub(sub)}
                className={`px-4 py-2 text-sm rounded  hover:bg-gray-100 ${
                  selectedSub?.name === sub.name ? "bg--50 text-blue-600" : ""
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details Card for Selected Sublocation */}
      {selectedSub && (

        <div className="border border-zinc-100 rounded shadow-sm p-4 flex gap-4">
          <div className="w-1/4">
            {/* Sublocation Title */}
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-1">
              <MapPin className="w-5 h-5 text-blue-600" />
              {selectedSub.name}
            </h2>

            {/* Address */}
            {selectedSub.address && (
              <p className="text-gray-600 text-sm mb-2">
                {selectedSub.address}
              </p>
            )}

            {/* Property Details */}
            {/* {selectedSub.details?.propertyDetails && (
              <p className="text-sm text-gray-800 mb-2">
                <strong>Property Details:</strong>{" "}
                {selectedSub.details.propertyDetails}
              </p>
            )} */}

            {/* About Property */}
            {/* {selectedSub.details?.aboutProperty && (
              <p className="text-sm text-gray-800 mb-2">
                <strong>About Property:</strong>{" "}
                {selectedSub.details.aboutProperty}
              </p>
            )} */}

            <div className="w-full h-96 bg-gray-100 mb-4 overflow-hidden rounded">
              {selectedSub.details?.mapLocation ? (
                <iframe
                  src={selectedSub.details.mapLocation}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Map Location"
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No map location provided
                </div>
              )}
            </div>
          </div>
          <div className="w-3/4 bg-amber-400 h-full">
          <img src={selectedSub.details?.carouselImages[0]} alt="" className="object-cover w-full" />
          </div>
          {/* (Optional) If you want to show a map in a div, you can embed an iframe or any map component */}
        </div>
      )}
    </div>
  );
}
