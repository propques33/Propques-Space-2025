import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import image4 from '../../assets/banner/image.png';
import { SearchResultContext } from '../../context/SearchResultContext';

const FilterBanner = () => {
  const [locations, setLocations] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    propertyTypes: ['Buy office/shop', 'Rent office/shop'],
    areas: ['No of seats', '10-20', '20-50', '50-100', '100-200']
  });
  const [propertyType, setPropertyType] = useState('Buy office/shop');
  const [city, setCity] = useState('');
  const [project, setProject] = useState('');
  const [area, setArea] = useState(filterOptions.areas[0]);

  const { updateFilters } = useContext(SearchResultContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch locations data from backend using Axios
    axios.get('http://localhost:5000/api/locations')
    
      .then(response => {
        let locs = response.data;
        // If the response is not an array, extract the array (assuming it's in a "locations" key)
        if (!Array.isArray(locs)) {
          locs = locs.locations ? locs.locations : [];
        }
        setLocations(locs);
        if (locs.length > 0) {
          // Set default city to the first available city
          setCity(locs[0].cityName);
          // Set default project to the first sublocation of the first city
          if (locs[0].subLocations && locs[0].subLocations.length > 0) {
            setProject(locs[0].subLocations[0].name);
          }
        }
      })
      .catch(error => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  // Update sublocation (project) when the city changes
  useEffect(() => {
    const selectedCity = locations.find(loc => loc.cityName === city);
    if (selectedCity && selectedCity.subLocations && selectedCity.subLocations.length > 0) {
      setProject(selectedCity.subLocations[0].name);
    } else {
      setProject('');
    }
  }, [city, locations]);

  const handleSearch = () => {
    // Save filters to context and navigate to the search results page
    updateFilters({ propertyType, city, project, area });
    navigate('/search');
  };

  // Extract unique city names from locations data
  const cityOptions = [...new Set(locations.map(loc => loc.cityName))];
  // Get sublocations for the selected city for the "Projects" dropdown
  const subLocations = locations.find(loc => loc.cityName === city)?.subLocations || [];

  return (
    <div
      className="w-full h-auto min-h-[24rem] flex items-center justify-center bg-cover bg-center px-4 sm:px-6 md:px-10 py-10"
      style={{ backgroundImage: `url(${image4})` }}
    >
      <div className="w-full max-w-5xl bg-white shadow-md border border-zinc-200 rounded-lg flex flex-col md:flex-row flex-wrap overflow-hidden">
        {/* Explore Text */}
        <div className="w-full md:w-auto flex items-center justify-center px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-300 text-sm font-medium">
          Explore
        </div>

        {/* City Dropdown */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full md:flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-300 outline-none text-sm"
        >
          {cityOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Projects Dropdown (showing sublocations for selected city) */}
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full md:flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-300 outline-none text-sm"
        >
          {subLocations.map((sub) => (
            <option key={sub._id} value={sub.name}>{sub.name}</option>
          ))}
        </select>

        {/* Area Dropdown */}
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full md:flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-300 outline-none text-sm"
        >
          {filterOptions.areas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        {/* Go Now Button */}
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-blue-500 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-600 transition-all"
        >
          Go now
        </button>
      </div>
    </div>
  );
};

export default FilterBanner;
