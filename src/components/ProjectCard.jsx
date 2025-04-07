import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project/${project.id}`)}
      className="cursor-pointer relative group"
    >
      <img src={project.image} alt={project.title} className="w-full h-[500px] object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-[#00000067] bg-opacity-50 text-white text-center text-xl p-4">
        {project.title}
      </div>
     
    </div>
  );
};

export default ProjectCard;
