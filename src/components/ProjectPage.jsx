import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import adarsh from "../assets/adarsh.png";

// Lucide icons
import {
  MapPin,
  Building,
  UserCircle,
  FileText,
  GalleryHorizontal,
  Phone,
} from "lucide-react";
import InventoryTable from "./InventoryTable";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    axios
      .get(`https://propques-space-backend-i8etb.ondigitalocean.app/api/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!property) return <div className="p-6">Loading...</div>;

  const galleryImages = property.details.carouselImages.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  // Contact content (appears as a right panel on desktop and inside modal on mobile)
  const contactContent = (
    <div className="max-w-md w-full bg-gray-50 p-5 rounded shadow space-y-5 text-gray-800 relative">
      {/* Close button for mobile modal */}
      <button
        onClick={() => setShowContactModal(false)}
        className="md:hidden absolute top-2 right-4 text-red-600 text-2xl "
      >
        x
      </button>
      {/* Property Name */}
      <h2 className="text-2xl font-semibold">{property.name}</h2>
      {/* Address */}
      <div className="flex items-start gap-2 text-sm">
        <MapPin size={16} className="mt-1 text-gray-500" />
        <p>{property.address}</p>
      </div>
      <hr className="border-gray-300" />
      {/* Manager Info */}
      <div className="flex items-center gap-4">
        <img
          src={adarsh}
          alt="Manager"
          className="w-14 h-14 rounded-full object-cover border"
        />
        <div>
          <p className="font-medium">Adarsh Mohan Dixit</p>
          <div className="flex items-center gap-2 mt-1">
            <Phone size={16} className="text-gray-500" />
            <span className="text-[#20B1EE] font-semibold text-lg">
              +91 73920 37856
            </span>
          </div>
        </div>
      </div>
      {/* Enquiry Form */}
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
        <select className="border rounded p-1 text-sm">
          <option value="">Enquiry For</option>
          <option value="1">Office Space</option>
          
        </select>
        <button className="w-full bg-[#20B1EE] text-white p-2 rounded hover:bg-[#20a2ee]">
          Book Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-4">
      {/* Left Section */}
      <div className="lg:w-2/3 space-y-6">
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
        <InventoryTable property={property} />

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

          {/* Nearby Amenities */}
          {property.details.nearbyAmenities?.length > 0 && (
            <div>
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

          {/* Map Section */}
          <div>
            {property.details.mapLocation.includes("goo.gl") ? (
              <p>
                <a
                  href={property.details.mapLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#20B1EE] underline"
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
              className="text-[#20B1EE] underline"
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
              className="w-28 h-32 object-cover rounded border-zinc-100 border-[2px] mt-4"
            />
          )}
        </div>
      </div>

      {/* Desktop Right Panel */}
      <div className="hidden md:block md:w-1/3 relative right-0">
      
      <p className="sticky top-20">
      {contactContent}
      </p>
      </div>

      {/* Mobile "Call Now" Button */}
      <div className="md:hidden">
        <div className="fixed inset-x-0 bottom-0 p-4 bg-white shadow-t z-50">
          <button
            onClick={() => setShowContactModal(true)}
            className="w-full bg-[#20B1EE] text-white p-3 rounded"
          >
            Call Now
          </button>
        </div>
      </div>

      {/* Mobile Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-[#0000009f] bg-opacity-50 flex justify-center items-center z-50 md:hidden">
          <div className="bg- p-4 w-11/12 max-w-md rounded-lg relative"> 
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-2 right-2 text-red-600 hidden"
            >
              x
            </button>
            {contactContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
