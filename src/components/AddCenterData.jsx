import React, { useState } from "react";
import axios from "axios";
import { UploadCloud, X, Plus } from "lucide-react";

const defaultInventoryItem = {
  assetType: "",
  assetName: "",
  capacity: "",
  occupied: "",
  bookingInfo: "",
  metadata: { subType: "", floor: "", amenities: [] },
};

const AddProperty = () => {
  const [property, setProperty] = useState({
    name: "",
    address: "",
    cityName: "",
    thumbnails: "",
    details: {
      carouselImages: [],
      propertyDetails: "",
      aboutProperty: "",
      mapLocation: "",
      nearbyAmenities: [],
      brochure: "",
      manager: { managerName: "", managerImageUrl: "" },
    },
    inventory: [defaultInventoryItem],
  });

  const [carouselFiles, setCarouselFiles] = useState([]);
  const [managerFile, setManagerFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [brochureFile, setBrochureFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Generic Cloudinary upload function
  const uploadFile = async (file, preset = "propques_space") => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbaszvcgg/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const uploadCarouselImages = async () => {
    const urls = await Promise.all(
      carouselFiles.map((file) => uploadFile(file))
    );
    setProperty((prev) => ({
      ...prev,
      details: { ...prev.details, carouselImages: urls },
    }));
  };

  const uploadThumbImage = async () => {
    if (thumbFile) {
      const url = await uploadFile(thumbFile);
      setProperty((prev) => ({
        ...prev,
        thumbnails: url,
      }));
    }
  };

  const uploadManagerImage = async () => {
    if (managerFile) {
      const url = await uploadFile(managerFile);
      setProperty((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          manager: { ...prev.details.manager, managerImageUrl: url },
        },
      }));
    }
  };

  const uploadBrochure = async () => {
    if (brochureFile) {
      const url = await uploadFile(brochureFile);
      setProperty((prev) => ({
        ...prev,
        details: { ...prev.details, brochure: url },
      }));
    }
  };

  const removeCarouselFile = (index) => {
    setCarouselFiles((prev) => prev.filter((_, i) => i !== index));
  };
  const removeManagerFile = () => setManagerFile(null);
  const removeThumbFile = () => setThumbFile(null);
  const removeBrochureFile = () => setBrochureFile(null);

  // Update nested details fields
  const handleDetailsChange = (field, value) => {
    setProperty((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  // For nearbyAmenities, we store as an array
  const handleAmenitiesChange = (value) => {
    setProperty((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        nearbyAmenities: value.split(",").map((item) => item.trim()),
      },
    }));
  };

  // Handle changes for each inventory item by index
  const handleInventoryChange = (index, e) => {
    const { name, value } = e.target;
    setProperty((prev) => {
      const inventory = [...prev.inventory];
      const item = { ...inventory[index] };
      if (name === "amenities") {
        item.metadata.amenities = value.split(",").map((a) => a.trim());
      } else if (["subType", "floor"].includes(name)) {
        item.metadata[name] = value;
      } else {
        item[name] = value;
      }
      inventory[index] = item;
      return { ...prev, inventory };
    });
  };

  const addInventoryItem = () => {
    setProperty((prev) => ({
      ...prev,
      inventory: [...prev.inventory, defaultInventoryItem],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      if (carouselFiles.length) await uploadCarouselImages();
      if (thumbFile) await uploadThumbImage();
      if (managerFile) await uploadManagerImage();
      if (brochureFile) await uploadBrochure();
      await axios.post("http://localhost:3000/api/properties", property, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Property saved successfully!");
    } catch (error) {
      alert("Failed to save property.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded space-y-6"
    >
      <h2 className="text-3xl font-bold text-center">Add New Property</h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Property Name"
          value={property.name}
          onChange={(e) => setProperty({ ...property, name: e.target.value })}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={property.address}
          onChange={(e) =>
            setProperty({ ...property, address: e.target.value })
          }
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          placeholder="City Name"
          value={property.cityName}
          onChange={(e) =>
            setProperty({ ...property, cityName: e.target.value })
          }
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          placeholder="Property Details"
          value={property.details.propertyDetails}
          onChange={(e) =>
            handleDetailsChange("propertyDetails", e.target.value)
          }
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          placeholder="About Property"
          value={property.details.aboutProperty}
          onChange={(e) => handleDetailsChange("aboutProperty", e.target.value)}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          placeholder="Nearby Amenities (comma separated)"
          value={property.details.nearbyAmenities.join(", ")}
          onChange={(e) => handleAmenitiesChange(e.target.value)}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          placeholder="Map Location"
          value={property.details.mapLocation}
          onChange={(e) => handleDetailsChange("mapLocation", e.target.value)}
          className="w-full p-3 border rounded"
        />
      </div>

      {/* Carousel Images */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Carousel Images</h3>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setCarouselFiles(Array.from(e.target.files))}
          className="mb-2"
        />
        <div className="flex flex-wrap gap-4 mb-2">
          {carouselFiles.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`carousel ${index}`}
                className="w-24 h-24 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeCarouselFile(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={uploadCarouselImages}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <UploadCloud size={18} /> Upload Carousel Images
        </button>
      </div>

      {/* Thumbnail Image */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Thumbnail Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbFile(e.target.files[0])}
          className="mb-2"
        />
        {thumbFile && (
          <div className="relative inline-block mb-2">
            <img
              src={URL.createObjectURL(thumbFile)}
              alt="Thumbnail"
              className="w-24 h-24 object-cover rounded border"
            />
            <button
              type="button"
              onClick={removeThumbFile}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              <X size={12} />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={uploadThumbImage}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <UploadCloud size={18} /> Upload Thumbnail Image
        </button>
      </div>

      {/* Brochure Image */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Brochure File</h3>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setBrochureFile(e.target.files[0])}
          className="mb-2"
        />
        {brochureFile && (
          <div className="relative inline-block mb-2">
            {brochureFile.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(brochureFile)}
                alt="Brochure"
                className="w-24 h-24 object-cover rounded border"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded border">
                <span className="text-sm text-gray-700">PDF File</span>
              </div>
            )}
            <button
              type="button"
              onClick={removeBrochureFile}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              <X size={12} />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={uploadBrochure}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <UploadCloud size={18} /> Upload Brochure
        </button>
      </div>

      {/* Inventory Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Inventory Items</h3>
        {property.inventory.map((item, index) => (
          <div key={index} className="border p-4 rounded mb-4 space-y-3">
            <input
              type="text"
              name="assetType"
              placeholder="Asset Type"
              value={item.assetType}
              onChange={(e) => handleInventoryChange(index, e)}
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              name="assetName"
              placeholder="Asset Name"
              value={item.assetName}
              onChange={(e) => handleInventoryChange(index, e)}
              className="w-full p-3 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={item.capacity}
                onChange={(e) => handleInventoryChange(index, e)}
                className="w-full p-3 border rounded"
              />
              <input
                type="number"
                name="occupied"
                placeholder="Occupied"
                value={item.occupied}
                onChange={(e) => handleInventoryChange(index, e)}
                className="w-full p-3 border rounded"
              />
            </div>
            <input
              type="text"
              name="bookingInfo"
              placeholder="Booking Info"
              value={item.bookingInfo}
              onChange={(e) => handleInventoryChange(index, e)}
              className="w-full p-3 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="subType"
                placeholder="Sub Type"
                value={item.metadata.subType}
                onChange={(e) => handleInventoryChange(index, e)}
                className="w-full p-3 border rounded"
              />
              <input
                type="number"
                name="floor"
                placeholder="Floor"
                value={item.metadata.floor}
                onChange={(e) => handleInventoryChange(index, e)}
                className="w-full p-3 border rounded"
              />
            </div>
            <input
              type="text"
              name="amenities"
              placeholder="Amenities (comma separated)"
              onChange={(e) => handleInventoryChange(index, e)}
              className="w-full p-3 border rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addInventoryItem}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          <Plus size={18} /> Add Inventory Item
        </button>
      </div>

      {/* Manager Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Manager Details</h3>
        <input
          type="text"
          placeholder="Manager Name"
          value={property.details.manager.managerName}
          onChange={(e) =>
            setProperty((prev) => ({
              ...prev,
              details: {
                ...prev.details,
                manager: {
                  ...prev.details.manager,
                  managerName: e.target.value,
                },
              },
            }))
          }
          className="w-full p-3 border rounded mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setManagerFile(e.target.files[0])}
          className="mb-2"
        />
        {managerFile && (
          <div className="relative inline-block mb-2">
            <img
              src={URL.createObjectURL(managerFile)}
              alt="Manager"
              className="w-24 h-24 object-cover rounded border"
            />
            <button
              type="button"
              onClick={removeManagerFile}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              <X size={12} />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={uploadManagerImage}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <UploadCloud size={18} /> Upload Manager Image
        </button>
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {uploading ? "Saving..." : "Save Property"}
      </button>
    </form>
  );
};

export default AddProperty;
