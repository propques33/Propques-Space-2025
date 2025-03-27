import React, { useState } from 'react';
import { projects } from '../data';
import ProjectCard from './ProjectCard';

const AllCenter = () => {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.location === filter);

  // Split into active and inactive
  const activeProjects = filtered.filter(p => p.status === 'active');
  const inactiveProjects = filtered.filter(p => p.status === 'inactive');

  return (
    <div className="px-6 py-4">
      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {['All', 'Indore', 'Lucknow', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'].map(city => (
          <button
            key={city}
            onClick={() => setFilter(city)}
            className={`text-lg font-medium ${
              filter === city ? 'text-blue-500 font-bold' : 'text-gray-400'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Active Cards */}
      <div className="grid grid-cols-1 gap-8 mb-10">
        {activeProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Inactive Cards */}
      {inactiveProjects.length > 0 && (
        <div>
          <h2 className="text-gray-500 text-md mb-4">Inactive Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inactiveProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCenter;
