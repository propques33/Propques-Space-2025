import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FilterPage() {
  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]);
  const [city, setCity] = useState("");
  const [center, setCenter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/properties/cities").then((res) => {
      setCities(res.data);
    });
  }, []);

  useEffect(() => {
    if (!city) {
      setCenters([]);
      return;
    }
    axios
      .get(`http://localhost:3000/api/properties/centers?city=${city}`)
      .then((res) => {
        setCenters(res.data);
      });
  }, [city]);

  const handleSearch = () => {
    navigate(`/results?city=${city}&center=${center}`);
  };

  return (
    <div
      className="relative md:h-[500px] h-[600px]  max-w-7xl mx-auto flex flex-col items-center justify-center bg-cover bg-center "
      style={{
        backgroundImage: `url('https://your-image-link.com/building.jpg')`,
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg- bg-opacity-30"></div>

      <div className="relative z-10 text-center px-4">
        <h2 className="flex flex-col items-center gap-5">
          <span className="text-4xl md:text-5xl font-bold text-[#20B1EE] capitalize">
            Welcome to your space search
          </span>
          <span className="text-2xl md:text-3xl capitalize">
            Discover your perfect space
          </span>
        </h2>
        
        {/* Search bar container */}
        <div className="relative flex flex-col md:flex-row mt-5 items-center justify-center space-y-2 md:space-y-0 md:space-x-2 bg-white rounded-full md:shadow-lg p-4">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 rounded-full w-full md:w-80 md:outline-none outline-1 outline-[#20B1EE] text-gray-700"
          >
            <option value="">Explore</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={center}
            onChange={(e) => setCenter(e.target.value)}
            className="p-3 rounded-full w-full md:w-80 md:outline-none outline-1 outline-[#20B1EE] text-gray-700"
          >
            <option value="">Space Name</option>
            {centers.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="bg-[#20B1EE] hover:bg-[#7cd8ff] text-white rounded-full px-5 py-3"
            disabled={!city || !center}
          >
            Go now
          </button>
        </div>
      </div>
    </div>
  );
}
