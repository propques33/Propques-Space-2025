import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CenterDetails = () => {
  const { cityName, centerId } = useParams();
  const [center, setCenter] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/locations/${cityName}/center/${centerId}`)
      .then((res) => setCenter(res.data))
      .catch((err) => console.error(err));
  }, [cityName, centerId]);

  // Set default main image once center data loads
  useEffect(() => {
    if (center) {
      const images = center.details.carouselImages;
      setSelectedImage(images && images.length ? images[0] : center.imageUrl);
    }
  }, [center]);

  if (!center) return <div className="p-4">Loading...</div>;

  return (
    <div className=" max-w-7xl mx-auto flex">
      <div className="w-2/3 ">
        {/* Main Image */}
        <img
          src={selectedImage}
          alt={center.name}
          className="rounded mb-4 w-full h-[600px] object-cover"
        />

        {/* Thumbnails */}
        <div className="flex space-x-2 mb-4">
          {center.details.carouselImages?.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`${center.name} ${index}`}
              onClick={() => setSelectedImage(imgUrl)}
              className={`rounded cursor-pointer w-28 h-20 object-cover border ${
                selectedImage === imgUrl
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
        <div></div>
        <div className="w-1/4"></div>
      </div>
      <div className="w-1/3 fixed right-0 px-0 py-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">{center.name}</h1>
          <p className="text-gray-600 mb-4">{center.address}</p>
        </div>
        <div className="flex gap-4 items-center justify-cente">
          <img
            src="https://images.unsplash.com/photo-1465637735148-7a30f47f5b2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h1 className="font-semibold">Adarsh Mohan Dixit</h1>
            <p>+91-7233811034</p>
          </div>
        </div>
        <div className="bg-green-300  flex-col">
          Name <br />
          <input type="text" className="border border-zinc-700 " />
          <br />
          Email <br />
          <input
            type="email"
            name=""
            id=""
            className="border border-zinc-700"
          />
        </div>
      </div>
    </div>
  );
};

export default CenterDetails;
