import React from "react";
import { Link } from "react-router-dom";
const ViewAllPropertiesButton = () => {
  return (
    <Link to="/view-all-projects" className="w-full max-w-5xl py-3 mx-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-all ease-in-out my-8 text-white rounded ">
      <p >View All Projects</p>
    </Link>
  );
};

export default ViewAllPropertiesButton;
