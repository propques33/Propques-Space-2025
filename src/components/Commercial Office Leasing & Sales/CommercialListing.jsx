import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import image5 from '../../assets/banner/image.png';
import image2 from '../../assets/banner/image2.png';
import image3 from '../../assets/banner/imag3.png';
import image4 from '../../assets/banner/imag4.png';

const data = {
  Mumbai: [
    { name: 'Bandra Kurla Complex', image: image5 },
    { name: 'Nariman Point', image: image2 },
    { name: 'Lower Parel', image: image3 },
    { name: 'Andheri East', image: image4 },
    { name: 'Powai', image: image5 },
  ],
  Bengaluru: [
    { name: 'Indiranagar', image: image3 },
    { name: 'Whitefield', image: image4 },
    { name: 'Koramangala', image: image5 },
    { name: 'Electronic City', image: image2 },
    { name: 'HSR Layout', image: image5 },
  ],
};

const allProjects = Object.values(data).flat();

const CommercialListing = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getProjects = () =>
    selectedCity === 'All' ? allProjects : data[selectedCity] || [];

  const paginatedProjects = getProjects().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(getProjects().length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <h2 className="text-3xl font-bold text-center mb-10">Explore Commercial Projects</h2>

      {/* City Dropdown */}
      <div className="flex justify- mb-10">
        <select
          className="text-base border border-gray-300 rounded-md px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Locations</option>
          {Object.keys(data).map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Project Cards */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 transition duration-500 ease-in-out">
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
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 md:px-0">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-white shadow rounded-full hover:bg-blue-100 disabled:opacity-30"
          >
            <ArrowLeft className="text-blue-600 w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 bg-white shadow rounded-full hover:bg-blue-100 disabled:opacity-30"
          >
            <ArrowRight className="text-blue-600 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <button className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-all">
          View All Properties for Sale
        </button>
      </div>
    </div>
  );
};

export default CommercialListing;
