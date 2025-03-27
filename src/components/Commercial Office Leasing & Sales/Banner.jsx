import React, { useState } from 'react';
import image4 from '../../assets/banner/image.png';

const FilterBanner = () => {
  const [propertyType, setPropertyType] = useState('Buy office/shop');
  const [city, setCity] = useState('Beijing');
  const [project, setProject] = useState('All Projects');
  const [area, setArea] = useState('area');

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
          <option>Indore</option>
          <option>Mumbai</option>
          <option>Lucknow</option>
        </select>

        {/* Project Dropdown */}
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full md:flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-300 outline-none text-sm"
        >
          <option>All Projects</option>
          <option>Propques One</option>
          <option>Galaxy Center</option>
        </select>

        {/* Area Dropdown */}
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full md:flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-300 outline-none text-sm"
        >
          <option>area</option>
          <option>1000-2000 sq ft</option>
          <option>2000-5000 sq ft</option>
        </select>

        {/* Go Now Button */}
        <button className="w-full md:w-auto bg-blue-500 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-600 transition-all">
          Go now
        </button>
      </div>
    </div>
  );
};

export default FilterBanner;
