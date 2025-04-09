import React from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
export default function CoworkingCentersBanner() {
  return (
    <div className="bg-[#20B1EE] text-white px-8 py-32 my-10 rounded-xl max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-semibold mb-3">
      Discover Managed Workspaces That Fit the Way You Work
      </h1>
      <p className="mb-6">
      Explore Top Locations and Find Your Perfect Space

      </p>
      <p className="inline-flex items-center gap-2 bg-white text-[#20B1EE] px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition">
        <Link to='/view-all-projects'>
        Explore Centers

        
        </Link>
        <MapPin size={18} />
      </p>
    </div>
  );
}
