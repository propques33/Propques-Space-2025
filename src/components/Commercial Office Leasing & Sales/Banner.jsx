import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cuni from "../../assets/cuni.png";
import w2 from "../../assets/w2.jpg";
import w3 from "../../assets/w5.jpg";
import worqspot from "../../assets/worqspot.jpeg";

export default function FilterPage() {
  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]);
  const [city, setCity] = useState("");
  const [center, setCenter] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [cuni, w2, w3, worqspot];

  useEffect(() => {
    axios.get("https://propques-space-backend-i8etb.ondigitalocean.app/api/properties/cities").then((res) => {
      setCities(res.data);
    });
  }, []);

  useEffect(() => {
    if (!city) {
      setCenters([]);
      return;
    }
    axios
      .get(`https://propques-space-backend-i8etb.ondigitalocean.app/api/properties/centers?city=${city}`)
      .then((res) => {
        setCenters(res.data);
      });
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    navigate(`/results?city=${city}&center=${center}`);
  };

  return (
    <div className="relative md:h-[600px] h-screen max-wxl mx-auto overflow-hidden">
      {/* Slider container */}
      <div
        className="absolute top-0 left-0 h-full w-full flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="w-full h-full object-cover flex-shrink-0"
            alt={`slide-${index}`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#00000090] bg-opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#20b0ee9d] to-[#fff0] bg-opacity-40"></div>

      {/* Foreground content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="flex flex-col items-center gap-5">
          <span className="text-[44px] leading-[10p] md:leading-none md:text-5xl font- text-zinc-100 capitalize">
            Discover Top <p className="block md:hidden"></p>  <span className="bg-[#20B1EE]  px-4 rounded-full text-nowrap"> Office Spaces
              </span> India
          </span>
          <span className="text-xl md:text-2xl capitalize text-white md:mt-0 lg:mt-0 -mt-4">
            Explore Prime Managed Workspaces Near You
          </span>
        </h2>

        <div className="relative flex flex-col md:flex-row mt-5 items-center justify-center space-y-2 md:space-y-0 md:space-x-2 bg-white rounded-2xl md:w-auto w-full md:rounded-full md:shadow-lg p-4 text-sm md:text-medium">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 rounded-full w-full md:w-80 md:outline-none outline-1 outline-[#20B1EE] text-gray-700"
          >
            <option value="">City Name</option>
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
            className="bg-[#20B1EE] hover:bg-[#7cd8ff] text-white rounded-full px-5 py-3 mt-2 md:mt-0 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center gap-2"
            disabled={!city || !center}
          >
            Go now
          </button>
        </div>
      </div>
    </div>
  );
}
