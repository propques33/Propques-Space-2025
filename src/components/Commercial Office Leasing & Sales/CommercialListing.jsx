import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import worqpot from '../../assets/worqpot.png';
import image2 from '../../assets/banner/image2.png';
import image3 from '../../assets/banner/imag3.png';
import image4 from '../../assets/banner/imag4.png';

const data = {
  Lucknow: [
    { name: 'Cubispace', image: 'https://lh3.googleusercontent.com/p/AF1QipOtRcMmXyfGGqJJ747z61V2RNuhH5-O4hNmFzol=s1360-w1360-h1020' },
    
  ],

  Indore: [
    { name: 'Workdesq', image: 'https://www.workdesq.com/wp-content/uploads/2024/01/DSC_3303-1-scaled.jpg' },
    
  ],
  

  Mumbai: [
    { name: 'Worqspot', image: worqpot },
  
  ],
 
};

const allProjects = Object.values(data).flat();

const CommercialListing = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Return either all projects or filtered by city
  const getProjects = () =>
    selectedCity === 'All' ? allProjects : data[selectedCity] || [];

  const paginatedProjects = getProjects().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(getProjects().length / itemsPerPage);

  const handleFilter = () => {
    // Navigate to a filtered view; adjust route/parameters as needed
    if (selectedCity !== 'All') {
      navigate(`/view-all-properties?city=${selectedCity}`);
    } else {
      navigate('/view-all-properties');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
     

      {/* City Dropdown & Filter Button */}
      <div className="flex justify-between mb-10 items-center">
      <h2 className="text-2xl font-semibold  text-zinc-800">
        Explore Projects
      </h2>
        <p>
        <select
          className="text-base border border-[#20B1EE]  px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm rounded-full"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Locations</option>
          {Object.keys(data).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {/* <button
          onClick={handleFilter}
          className="ml-4 bg-[#20B1EE] text-white px-4 py-2 rounded-full hover:bg-[#20b0eec2] transition"
        >
          Filter
        </button> */}
        </p>
      </div>

      {/* Project Cards */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 transition duration-500 ease-in-out">
          {paginatedProjects.map((project, index) => (
            <div
              key={index}
              className="text-center group bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-64 object-cover rounded-t"
              />
              <p className="mt-2 text-sm font-medium pb-4 group-hover:text-blue-600 transition">
                {project.name}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Arrows */}
        {totalPages > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 md:px-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white shadow rounded-full hover:bg-blue-100 disabled:opacity-30"
            >
              <ArrowLeft className="text-blue-600 w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 bg-white shadow rounded-full hover:bg-blue-100 disabled:opacity-30"
            >
              <ArrowRight className="text-blue-600 w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* CTA Button */}
      {/* <div className="mt-12 text-center">
        <Link
          to="/view-all-properties"
          className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-all"
        >
          View All Properties
        </Link>
      </div> */}
    </div>
  );
};

export default CommercialListing;
