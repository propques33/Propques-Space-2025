import React from "react";
import { MapPin } from "lucide-react";

export default function CoworkingCentersBanner() {
  return (
    <div className="bg-[#20B1EE] text-white px-8 py-32 rounded-xl max-w-7xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-3">
        Discover Inspiring Coworking Spaces
      </h1>
      <p className="mb-6">
        Explore coworking centers across multiple locations and find the ideal workspace.
      </p>
      <button className="inline-flex items-center gap-2 bg-white text-[#20B1EE] px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition">
        Explore Centers
        <MapPin size={18} />
      </button>
    </div>
  );
}
