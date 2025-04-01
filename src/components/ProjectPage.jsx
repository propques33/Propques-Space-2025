import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// Lucide icons
import {
  MapPin,
  Building,
  UserCircle,
  FileText,
  GalleryHorizontal,
  Train,
  Phone,
  Info,
  BookOpenCheck,
} from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!property) return <div className="p-6">Loading...</div>;
  {
    console.log(property);
  }

  const galleryImages = property.details.carouselImages.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <div className="max-w-7xl mx-auto flex gap-8 ">
      {/* Left Section */}
      <div className="w-2/3 space-y-6">
        {/* Image Gallery */}
        <div>
          {galleryImages.length > 0 ? (
            <ImageGallery
              items={galleryImages}
              showPlayButton={false}
              showFullscreenButton={false}
              thumbnailPosition="bottom"
            />
          ) : (
            <p>No images available.</p>
          )}
        </div>

        {/* Inventory Table */}
        <div>
          <div className="overflow-x-auto border rounded">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Asset Type</th>
                  <th className="px-4 py-2 border">Asset Name</th>
                  <th className="px-4 py-2 border">Capacity</th>
                  <th className="px-4 py-2 border">Occupied</th>
                  <th className="px-4 py-2 border">Booking Info</th>
                  <th className="px-4 py-2 border">Floor</th>
                </tr>
              </thead>
              <tbody>
                {property.inventory.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-4 py-2 border">{item.assetType}</td>
                    <td className="px-4 py-2 border">{item.assetName}</td>
                    <td className="px-4 py-2 border">{item.capacity}</td>
                    <td className="px-4 py-2 border">{item.occupied}</td>
                    <td className="px-4 py-2 border">{item.bookingInfo}</td>
                    <td className="px-4 py-2 border">{item.metadata.floor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building size={24} />
            {property.name}
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin size={18} />
            {property.address}
          </p>
          <p className="text-gray-700 text-sm">
            {property.details.propertyDetails}
          </p>

          {/* Basic Info */}
          <div className="space-y-">
            {/* Nearby Amenities */}
            {property.details.nearbyAmenities?.length > 0 && (
              <div className="">
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <GalleryHorizontal size={20} />
                  Nearby Amenities
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {property.details.nearbyAmenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div>
            {property.details.mapLocation.includes("goo.gl") ? (
              <p>
                <a
                  href={property.details.mapLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Open in Google Maps
                </a>
                <span className="text-sm text-gray-500 block mt-1">
                  (Embed not supported for short links)
                </span>
              </p>
            ) : (
              <iframe
                src={property.details.mapLocation}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Map"
                className="rounded shadow"
              />
            )}
          </div>
        </div>

        {/* Brochure */}
        {property.details.brochure && (
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <FileText size={20} />
              Brochure
            </h2>
            <a
              href={property.details.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Brochure
            </a>
          </div>
        )}

        {/* Manager Info */}
        <div className="my-6">
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <UserCircle size={24} />
            Manager
          </h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {property.details.manager.managerName}
          </p>
          {property.details.manager.managerImageUrl && (
            <img
              src={property.details.manager.managerImageUrl}
              alt="Manager"
              className="w-24 h-24 object-cover rounded mt-2 border"
            />
          )}
        </div>
      </div>

      {/* Right Panel - Future Use */}
      <div className="w-1/3">
        <div className="max-w-md w-full bg-gray-50 p-5 rounded shadow space-y-5 text-gray-800">
          {/* Property Name */}
          <h2 className="text-2xl font-semibold"> {property.name}</h2>

          {/* Address */}
          <div className="flex items-start gap-2 text-sm">
            <MapPin size={16} className="mt-1 text-gray-500" />
            <p> {property.address}</p>
          </div>

          <hr className="border-gray-300" />

          {/* Manager Info */}
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/60"
              alt="Manager"
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <p className="font-medium">Adarsh Mohan Dixit</p>
              <div className="flex items-center gap-2 mt-1">
                <Phone size={16} className="text-gray-500" />
                <span className="text-blue-600 font-semibold text-lg">
                  12345678
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="name"
              placeholder="Name"
              className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Phone number"
              className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
           <select name="" id="" className="border rounded p-1 text-sm">
             <option value="">Preferred Property Type</option>
             <option value="1">Apartments</option>
             <option value="2">Condos</option>
             <option value="3">Houses</option>
             <option value="4">Villas</option>
           </select>

             <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
               Book Now
             </button>
 
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
