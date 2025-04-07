import React from "react";
import { Link } from "react-router-dom";
const ViewAllPropertiesButton = () => {
  return (
    <Link to="/view-all-projects" className="bg-red-500">
      <p className=" max-w-4xl py-3 mx-auto flex items-center justify-center bg-[#20B1EE] hover:bg-[#2eaae0] transition-all ease-in-out my-8 text-white rounded ">View All Projects</p>
    </Link>
  );
};

export default ViewAllPropertiesButton;
