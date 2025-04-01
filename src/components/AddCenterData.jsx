import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud } from 'lucide-react';

const AddProperty = () => {
  const [property, setProperty] = useState({
    name: '',
    address: '',
    cityName: '',
    thumbnails: '',
    details: {
      carouselImages: [],
      propertyDetails: '',
      aboutProperty: '',
      mapLocation: '',
      nearbyAmenities: [],
      brochure: '',
      manager: { managerName: '', managerImageUrl: '' }
    },
    inventory: [
      {
        assetType: '',
        assetName: '',
        capacity: '',
        occupied: '',
        bookingInfo: '',
        metadata: { subType: '', floor: '', amenities: [] }
      }
    ]
  });

  // File states for different uploads
  const [carouselFiles, setCarouselFiles] = useState([]);
  const [managerFile, setManagerFile] = useState(null);
  const [brochureFile, setBrochureFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Generic Cloudinary upload function
  const uploadFile = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'propques_space');
    const res = await fetch('https://api.cloudinary.com/v1_1/dbaszvcgg/image/upload', {
      method: 'POST',
      body: data
    });
    const json = await res.json();
    return json.secure_url;
  };

  const uploadCarouselImages = async () => {
    const urls = await Promise.all(
      carouselFiles.map(file => uploadFile(file, 'propques_space'))
    );
    setProperty(prev => ({
      ...prev,
      details: { ...prev.details, carouselImages: urls }
    }));
  };

  const uploadManagerImage = async () => {
    if (managerFile) {
      const url = await uploadFile(managerFile, 'manager_preset');
      setProperty(prev => ({
        ...prev,
        details: { 
          ...prev.details, 
          manager: { ...prev.details.manager, managerImageUrl: url }
        }
      }));
    }
  };

  const uploadBrochure = async () => {
    if (brochureFile) {
      const url = await uploadFile(brochureFile, 'propques_space');
      setProperty(prev => ({
        ...prev,
        details: { ...prev.details, brochure: url }
      }));
    }
  };

  // Handle inventory changes (for a single inventory item)
  const handleInventoryChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => {
      const item = { ...prev.inventory[0] };
      if (name === 'amenities') {
        item.metadata.amenities = value.split(',').map(a => a.trim());
      } else if (['subType', 'floor'].includes(name)) {
        item.metadata[name] = value;
      } else {
        item[name] = value;
      }
      return { ...prev, inventory: [item] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      if (carouselFiles.length) await uploadCarouselImages();
      if (managerFile) await uploadManagerImage();
      if (brochureFile) await uploadBrochure();
      await axios.post('http://localhost:3000/api/properties', property, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Property saved successfully!');
    } catch (error) {
      alert('Failed to save property.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Property</h2>
      <input
        type="text"
        placeholder="Property Name"
        value={property.name}
        onChange={e => setProperty({ ...property, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={property.address}
        onChange={e => setProperty({ ...property, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="City Name"
        value={property.cityName}
        onChange={e => setProperty({ ...property, cityName: e.target.value })}
      />

      {/* Carousel Images */}
      <div>
        <h3>Carousel Images</h3>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={e => setCarouselFiles(Array.from(e.target.files))}
        />
        <button type="button" onClick={uploadCarouselImages}>
          <UploadCloud size={16} /> Upload Carousel Images
        </button>
      </div>

      {/* Manager Image */}
      <div>
        <h3>Manager Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={e => setManagerFile(e.target.files[0])}
        />
        <button type="button" onClick={uploadManagerImage}>
          <UploadCloud size={16} /> Upload Manager Image
        </button>
      </div>

      {/* Brochure */}
      <div>
        <h3>Brochure Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={e => setBrochureFile(e.target.files[0])}
        />
        <button type="button" onClick={uploadBrochure}>
          <UploadCloud size={16} /> Upload Brochure
        </button>
      </div>

      {/* Inventory Section */}
      <div>
        <h3>Inventory Item</h3>
        <input
          type="text"
          name="assetType"
          placeholder="Asset Type"
          value={property.inventory[0].assetType}
          onChange={handleInventoryChange}
        />
        <input
          type="text"
          name="assetName"
          placeholder="Asset Name"
          value={property.inventory[0].assetName}
          onChange={handleInventoryChange}
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={property.inventory[0].capacity}
          onChange={handleInventoryChange}
        />
        <input
          type="number"
          name="occupied"
          placeholder="Occupied"
          value={property.inventory[0].occupied}
          onChange={handleInventoryChange}
        />
        <input
          type="text"
          name="bookingInfo"
          placeholder="Booking Info"
          value={property.inventory[0].bookingInfo}
          onChange={handleInventoryChange}
        />
        <input
          type="text"
          name="subType"
          placeholder="Sub Type"
          value={property.inventory[0].metadata.subType}
          onChange={handleInventoryChange}
        />
        <input
          type="number"
          name="floor"
          placeholder="Floor"
          value={property.inventory[0].metadata.floor}
          onChange={handleInventoryChange}
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated)"
          onChange={handleInventoryChange}
        />
      </div>

      <button type="submit" disabled={uploading}>
        {uploading ? 'Saving...' : 'Save Property'}
      </button>
    </form>
  );
};

export default AddProperty;
