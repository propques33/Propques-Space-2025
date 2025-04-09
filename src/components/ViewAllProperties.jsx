import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Filter states
  const [cityFilter, setCityFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [minCapacity, setMinCapacity] = useState("");

  useEffect(() => {
    axios
      .get("https://propques-space-backend-i8etb.ondigitalocean.app/api/properties")
      .then((res) => {
        setProperties(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error("Failed to fetch properties", err));


       // Ensure scrolling to the top of the document when the component is mounted
    window.scrollTo({
      top: 0,
      behavior: "auto", // You can use "auto" for instant scroll
    });

    // As a fallback, scroll the root element
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Helper function to filter inventory items
  const passesFilters = (item) => {
    if (item.occupied !== 0) return false;
    if (minCapacity && item.available < Number(minCapacity)) return false;
    if (selectedFilters.length > 0) {
      let typeMatch = false;
      if (
        selectedFilters.includes("Manager Cabin") &&
        item.managerCabins &&
        item.managerCabins.some((c) => c.occupied === 0)
      ) {
        typeMatch = true;
      }
      if (
        item.rooms &&
        item.rooms.some(
          (r) => r.occupied === 0 && selectedFilters.includes(r.roomType)
        )
      ) {
        typeMatch = true;
      }
      if (!typeMatch) return false;
    }
    return true;
  };

  useEffect(() => {
    let temp = [...properties];

    // Filter by city and address
    if (cityFilter) {
      temp = temp.filter((p) =>
        p.cityName?.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }
    if (addressFilter) {
      temp = temp.filter((p) =>
        [p.details?.propertyDetails, p.details?.aboutProperty, p.address]
          .join(" ")
          .toLowerCase()
          .includes(addressFilter.toLowerCase())
      );
    }

    // Always filter properties that have available spaces
    temp = temp.filter(
      (p) => p.inventory && p.inventory.some((item) => passesFilters(item))
    );

    setFiltered(temp);
  }, [cityFilter, addressFilter, selectedFilters, minCapacity, properties]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const handleCapacityChange = (e) => {
    setMinCapacity(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 gap-4 ">
      {/* Mobile Search Section at Top */}
      <div className="block lg:hidden mb-4">
        <div className="bg-white shadow rounded px-4 py-2">
          <h3 className="text-lg font-semibold mb-2 m-auto text-center">
            Search
          </h3>
          <input
            type="text"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            placeholder="Enter city name"
            className="w-full text-sm border py-1 px-3 rounded mb-4"
          />
          <input
            type="text"
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            placeholder="Search by address, description, or about"
            className="w-full text-sm border py-1 px-3 rounded"
          />
        </div>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:w-1/4    mt-12  p-4">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <label className="block mb-1 text-sm text-gray-600">City</label>
          <input
            type="text"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            placeholder="Enter city name"
            className="w-full border p-2 rounded mb-4"
          />
          <label className="block mb-1 text-sm text-gray-600">Search</label>
          <input
            type="text"
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            placeholder="Search by address, description, or about"
            className="w-full border p-2 rounded mb-4"
          />
          <div className="mb-4">
            <h4 className="text-md font-semibold mb-2">Inventory Filters</h4>
            {["Manager Cabin", "Work Station"].map((filter) => (
              <div className="mb-2" key={filter}>
                <input
                  type="checkbox"
                  id={filter}
                  value={filter}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <label htmlFor={filter}>{filter}</label>
              </div>
            ))}
          </div>
          <div className="mb-2">
            <label
              htmlFor="minCapacity"
              className="block mb-1 text-sm text-gray-600"
            >
              Minimum Seating Capacity
            </label>
            <input
              type="number"
              id="minCapacity"
              value={minCapacity}
              onChange={handleCapacityChange}
              placeholder="Enter minimum capacity"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Properties Display */}
        <div className="lg:w-3/4 w-full mt-16">
          <div className="grid sm:grid-cols-1 gap-6">
            {filtered.length > 0 ? (
              filtered.map((property) => (
                <Link key={property._id} to={`/properties/${property._id}`}>
                  <div className="bg-white flex flex-col rounded shadow hover:shadow-md transition p-4 hover:bg-zinc-100">
                    <div className="flex flex-col lg:flex-row">
                      {property.details?.carouselImages?.[0] ? (
                        <img
                          src={property.details.carouselImages[0]}
                          alt={property.name}
                          className="md:w-80 w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="w-80 h-full flex items-center justify-center bg-gray-100 text-gray-500">
                          No Image Available
                        </div>
                      )}
                      <div className="p-4 md:space-y-2 space-y-1">
                        <h2 className="lg:text-3xl text-xl font-semibold">
                          {property.name}
                        </h2>
                        <p className="lg:text-xl text-sm text-gray-800">
                          {property.cityName}
                        </p>
                        <p className="lg:text-sm text-xs text-gray-500 w-[80%]">
                          {property.address}
                        </p>
                        <Link to={`/properties/${property._id}`}>
                          <button className="bg-[#22B0ED] hover:bg-[#7ac8e9] text-white text-md px-4 py-2 rounded my-1">
                            Explore
                          </button>
                        </Link>
                      </div>
                    </div>
                    {/* Inventory Table */}
                    {property.inventory &&
                      (() => {
                        const filteredInventory = property.inventory.filter(
                          (item) => {
                            const freeCabins = item.managerCabins
                              ? item.managerCabins.filter(
                                  (c) => c.occupied === 0
                                )
                              : [];
                            const freeRooms = item.rooms
                              ? item.rooms.filter((r) => r.occupied === 0)
                              : [];
                            return (
                              freeCabins.length > 0 || freeRooms.length > 0
                            );
                          }
                        );
                        if (filteredInventory.length === 0) return null;
                        return (
                          <table className="table-auto w-full text-sm border mt-3">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="p-2 border">Asset Name</th>
                                <th className="p-2 border">
                                  Vacant Manager Cabins
                                </th>
                                <th className="p-2 border">
                                  Vacant Work Stations
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredInventory.map((item) => {
                                const freeCabins = item.managerCabins
                                  ? item.managerCabins.filter(
                                      (c) => c.occupied === 0
                                    )
                                  : [];
                                const freeRooms = item.rooms
                                  ? item.rooms.filter((r) => r.occupied === 0)
                                  : [];
                                return (
                                  <tr key={item._id} className="border-t">
                                    <td className="p-2 border">
                                      {item.assetName || "-"}
                                    </td>
                                    <td className="p-2 border">
                                      <ul className="list-disc ml-4">
                                        {freeCabins.map((cabin) => (
                                          <li key={cabin._id}>
                                            {cabin.managerName} (Cap:{" "}
                                            {cabin.capacity})
                                          </li>
                                        ))}
                                      </ul>
                                    </td>
                                    <td className="p-2 border">
                                      <ul className="list-disc ml-4">
                                        {freeRooms.map((room) => (
                                          <li key={room._id}>
                                            {room.roomType} (Cap:{" "}
                                            {room.capacity})
                                          </li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        );
                      })()}
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No properties found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Filters */}
      <div className="lg:hidden">
        <div className="fixed bottom-0  left-0 right-0 bg-white shadow-lg rounded-full px-4 py-4 m-4">
          <div className="flex justify-around items-center mb-4">
            {["Manager Cabin", "Work Station"].map((filter) => (
              <div className="flex items-center" key={filter}>
                <input
                  type="checkbox"
                  id={`mobile-${filter}`}
                  value={filter}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <label
                  htmlFor={`mobile-${filter}`}
                  className="text-sm text-gray-700"
                >
                  {filter}
                </label>
              </div>
            ))}
          </div>
          <div className="px-4 text-sm">
            <input
              type="number"
              id="mobile-minCapacity"
              value={minCapacity}
              onChange={handleCapacityChange}
              placeholder="Enter minimum capacity"
              className="px-3 py-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
