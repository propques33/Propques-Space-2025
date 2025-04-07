import React, { useState } from "react";
import { Plus, Trash, UploadCloud, X } from "lucide-react";

const defaultInventoryItem = {
  assetName: "",
  metadata: { floor: "" },
  totalCapacity: "",
  managerCabins: [],
  rooms: [],
};

function App() {
  const [inventories, setInventories] = useState([{ ...defaultInventoryItem }]);
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
  });

  const [carouselFiles, setCarouselFiles] = useState([]);
  const [managerFile, setManagerFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [brochureFile, setBrochureFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Generic Cloudinary upload function with error handling
  const uploadFile = async (file) => {
    try {
      if (!file) {
        console.error("No file provided for upload");
        return null;
      }
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "propques_space");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbaszvcgg/image/upload",
        { method: "POST", body: data }
      );

      if (!res.ok) {
        console.error("Cloudinary response error", res);
        throw new Error("Cloudinary upload failed");
      }
      const json = await res.json();
      console.log("Upload successful:", json.secure_url);
      return json.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  const uploadCarouselImages = async () => {
    const urls = await Promise.all(carouselFiles.map((file) => uploadFile(file)));
    setProperty((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        carouselImages: urls.filter((url) => url !== null),
      },
    }));
  };

  const uploadThumbImage = async () => {
    if (thumbFile) {
      const url = await uploadFile(thumbFile);
      if (url) setProperty((prev) => ({ ...prev, thumbnails: url }));
    }
  };

  const uploadBrochure = async () => {
    if (brochureFile) {
      const url = await uploadFile(brochureFile);
      if (url)
        setProperty((prev) => ({
          ...prev,
          details: { ...prev.details, brochure: url },
        }));
    }
  };

  const uploadManagerImage = async () => {
    if (managerFile) {
      const url = await uploadFile(managerFile);
      if (url)
        setProperty((prev) => ({
          ...prev,
          details: {
            ...prev.details,
            manager: { ...prev.details.manager, managerImageUrl: url },
          },
        }));
    }
  };

  const removeCarouselFile = (index) =>
    setCarouselFiles((prev) => prev.filter((_, i) => i !== index));
  const removeManagerFile = () => setManagerFile(null);
  const removeThumbFile = () => setThumbFile(null);
  const removeBrochureFile = () => setBrochureFile(null);

  const handleDetailsChange = (field, value) => {
    setProperty((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  const handleAmenitiesChange = (value) => {
    setProperty((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        nearbyAmenities: value.split(",").map((item) => item.trim()),
      },
    }));
  };

  const handleUploadAssets = async () => {
    setUploading(true);
    await uploadCarouselImages();
    await uploadThumbImage();
    await uploadBrochure();
    await uploadManagerImage();
    setUploading(false);
  };

  const handleInventoryChange = (index, field, value) => {
    const updated = [...inventories];
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      updated[index][parent][child] = value;
    } else {
      updated[index][field] = value;
    }
    setInventories(updated);
  };

  const handleCabinChange = (invIndex, cabinIndex, field, value) => {
    const updated = [...inventories];
    updated[invIndex].managerCabins[cabinIndex][field] = value;
    setInventories(updated);
  };

  const handleRoomChange = (invIndex, roomIndex, field, value) => {
    const updated = [...inventories];
    updated[invIndex].rooms[roomIndex][field] = value;
    setInventories(updated);
  };

  const getDefaultInventoryItem = () => ({
    assetName: "",
    metadata: { floor: "" },
    totalCapacity: "",
    managerCabins: [],
    rooms: [],
  });

  const addInventory = () =>
    setInventories([...inventories, getDefaultInventoryItem()]);

  const addCabin = (index) => {
    const updated = [...inventories];
    updated[index].managerCabins.push({ managerName: "", capacity: 0, occupied: 0 });
    setInventories(updated);
  };

  const addRoom = (index) => {
    const updated = [...inventories];
    updated[index].rooms.push({ roomType: "", capacity: 0, occupied: 0 });
    setInventories(updated);
  };

  const removeCabin = (invIndex, cabinIndex) => {
    const updated = [...inventories];
    updated[invIndex].managerCabins.splice(cabinIndex, 1);
    setInventories(updated);
  };

  const removeRoom = (invIndex, roomIndex) => {
    const updated = [...inventories];
    updated[invIndex].rooms.splice(roomIndex, 1);
    setInventories(updated);
  };

  const handleSubmit = async () => {
    try {
      await handleUploadAssets();
      const fullProperty = { ...property, inventory: inventories };
      console.log("Submitting Property:", fullProperty);
      setUploading(true);
      const response = await fetch("http://localhost:3000/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullProperty),
      });
      if (response.ok) {
        alert("Property submitted successfully");
      } else {
        alert("Failed to submit property");
      }
      setUploading(false);
    } catch (err) {
      console.error(err);
      alert("Network error");
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Property Details */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Property Inventories</h1>
        <input
          type="text"
          placeholder="Property Name"
          value={property.name}
          onChange={(e) =>
            setProperty({ ...property, name: e.target.value })
          }
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
          onChange={(e) =>
            handleDetailsChange("aboutProperty", e.target.value)
          }
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
          onChange={(e) =>
            handleDetailsChange("mapLocation", e.target.value)
          }
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

      {/* Brochure File */}
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

      {inventories.map((inv, i) => (
        <div key={i} className="border p-4 rounded space-y-4">
          <div>
            <label>Inventory Name</label>
            <input
              type="text"
              value={inv.assetName}
              onChange={(e) =>
                handleInventoryChange(i, "assetName", e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>Floor</label>
            <input
              type="number"
              value={inv.metadata.floor}
              onChange={(e) =>
                handleInventoryChange(i, "metadata.floor", e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>Total Capacity</label>
            <input
              type="number"
              value={inv.totalCapacity}
              onChange={(e) =>
                handleInventoryChange(i, "totalCapacity", e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Manager Cabins */}
          <div>
            <label className="font-semibold">Manager Cabins</label>
            {inv.managerCabins.map((cabin, ci) => (
              <div key={ci} className="border p-2 rounded mb-2 relative">
                <button
                  onClick={() => removeCabin(i, ci)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <Trash size={30} />
                </button>
                <input
                  type="text"
                  placeholder="Manager Name"
                  value={cabin.managerName}
                  onChange={(e) =>
                    handleCabinChange(i, ci, "managerName", e.target.value)
                  }
                  className="w-full mb-2 border p-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={cabin.capacity}
                  onChange={(e) =>
                    handleCabinChange(i, ci, "capacity", e.target.value)
                  }
                  className="w-full mb-2 border p-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Occupied"
                  value={cabin.occupied}
                  onChange={(e) =>
                    handleCabinChange(i, ci, "occupied", e.target.value)
                  }
                  className="w-full border p-1 rounded"
                />
              </div>
            ))}
            <button
              onClick={() => addCabin(i)}
              className="text-blue-500 mt-2 flex items-center"
            >
              <Plus size={14} className="mr-1" /> Add Cabin
            </button>
          </div>

          {/* Rooms */}
          <div>
            <label className="font-semibold">Rooms</label>
            {inv.rooms.map((room, ri) => (
              <div key={ri} className="border p-2 rounded mb-2 relative">
                <button
                  onClick={() => removeRoom(i, ri)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <Trash size={30} />
                </button>
                <input
                  type="text"
                  placeholder="Room Type"
                  value={room.roomType}
                  onChange={(e) =>
                    handleRoomChange(i, ri, "roomType", e.target.value)
                  }
                  className="w-full mb-2 border p-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={room.capacity}
                  onChange={(e) =>
                    handleRoomChange(i, ri, "capacity", e.target.value)
                  }
                  className="w-full mb-2 border p-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Occupied"
                  value={room.occupied}
                  onChange={(e) =>
                    handleRoomChange(i, ri, "occupied", e.target.value)
                  }
                  className="w-full border p-1 rounded"
                />
              </div>
            ))}
            <button
              onClick={() => addRoom(i)}
              className="text-blue-500 mt-2 flex items-center"
            >
              <Plus size={14} className="mr-1" /> Add Room
            </button>
          </div>
        </div>
      ))}

      {/* Inventory Section */}
      <button
        onClick={addInventory}
        className="flex items-center bg-green-500 text-white px-3 py-1 rounded"
      >
        <Plus size={16} className="mr-1" /> New Inventory
      </button>

      {/* Manager Section */}
      <div className="border p-4 rounded space-y-4">
        <h3 className="text-xl font-semibold">Manager Details</h3>
        <input
          type="text"
          placeholder="Manager Name"
          value={property.details.manager.managerName}
          onChange={(e) =>
            setProperty((prev) => ({
              ...prev,
              details: {
                ...prev.details,
                manager: { ...prev.details.manager, managerName: e.target.value },
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

      {/* Submit All */}
      <div>
        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {uploading ? "Saving..." : "Save Property"}
        </button>
      </div>
    </div>
  );
}

export default App;
