import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [minCapacity, setMinCapacity] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(true);
  const query = new URLSearchParams(useLocation().search);
  const city = query.get("city");
  const center = query.get("center");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/properties/search", {
        params: { city, center },
      })
      .then((res) => setResults(res.data));
  }, [city, center]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
    if (showFilterPopup) setShowFilterPopup(false);
  };

  const handleCapacityChange = (e) => {
    setMinCapacity(e.target.value);
    if (showFilterPopup) setShowFilterPopup(false);
  };

  // Check if an inventory item meets the filters
  const passesFilters = (item) => {
    if (item.occupied !== 0) return false;
    if (minCapacity && item.available < Number(minCapacity)) return false;
    if (selectedFilters.length > 0) {
      let typeMatch = false;
      if (
        selectedFilters.includes("Manager Cabin") &&
        item.managerCabins.some((c) => c.occupied === 0)
      ) {
        typeMatch = true;
      }
      if (
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

  const filteredResults = results.filter((prop) =>
    prop.inventory.some((item) => passesFilters(item))
  );

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      <h2 className="text-2xl  mb-4">Search Results</h2>

      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-full md:w-1/4 p-4 border-r border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <form>
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
            <div className="mb-2">
              <label htmlFor="minCapacity" className="block mb-1">
                Minimum Seating Capacity
              </label>
              <input
                type="number"
                id="minCapacity"
                value={minCapacity}
                onChange={handleCapacityChange}
                placeholder="Enter minimum"
                className="border rounded p-1 w-full"
              />
            </div>
          </form>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 p-4">
          {filteredResults.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredResults.map((prop) => (
                <Link key={prop._id} to={`/properties/${prop._id}`}>
                  <div className="border border-zinc-300 rounded-xl p-4 shadow">
                    <img
                      src={prop.thumbnails}
                      alt={prop.name}
                      className="w-full h-auto object-cover rounded mb-3"
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{prop.name}</h3>
                        <p className="text-gray-600">{prop.cityName}</p>
                        <p className="text-gray-500 text-sm mb-2 w-full sm:w-[80%]">
                          {prop.address}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <Link to={`/properties/${prop._id}`}>
                          <p className="py-2 w-full sm:w-32 mx-auto flex items-center justify-center bg-[#20B1EE] hover:bg-blue-700 transition-all ease-in-out text-white rounded">
                            Explore
                          </p>
                        </Link>
                      </div>
                    </div>
                    {/* Inventory Table */}
                    {prop.inventory && (() => {
  const filteredInventory = prop.inventory.filter((item) => passesFilters(item));
  if (filteredInventory.length === 0) return null;
  return (
    <table className="table-auto w-full text-sm border mt-3">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Asset Name</th>
          <th className="p-2 border">Vacant Manager Cabins</th>
          <th className="p-2 border">Vacant Work Station</th>
        </tr>
      </thead>
      <tbody>
      {filteredInventory.map((item) => {
  const freeCabins = item.managerCabins.filter((c) => c.occupied === 0);
  const freeRooms = item.rooms.filter((r) => r.occupied === 0);
  // Skip this row if no spaces are vacant
  if (freeCabins.length === 0 && freeRooms.length === 0) return null;

  return (
    <tr key={item._id} className="border-t">
      <td className="p-2 border">{item.assetName || "-"}</td>
      <td className="p-2 border">
        <ul className="list-disc ml-4">
          {freeCabins.map((cabin) => (
            <li key={cabin._id}>
              {cabin.managerName} (Cap: {cabin.capacity})
            </li>
          ))}
        </ul>
      </td>
      <td className="p-2 border">
        <ul className="list-disc ml-4">
          {freeRooms.map((room) => (
            <li key={room._id}>
              {room.roomType} (Cap: {room.capacity})
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
              ))}
            </div>
          )}
        </div>
      </div>

      {showFilterPopup && (
        <div className="fixed text-sm inset-x-0 bottom-8 bg-white px-8 py-4 shadow-lg md:hidden rounded-full mx-4 shadow-xl border border-[#20B1EE]">
          <div className="flex flex-col space-y-4">
            <form className="flex flex-col space-y-2">
              <div className="flex w-full justify-between items-center">
                {["Manager Cabin", "Work Station"].map((filter) => (
                  <div key={filter} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`mobile-${filter}`}
                      value={filter}
                      className="mr-2"
                    />
                    <label htmlFor={`mobile-${filter}`}>{filter}</label>
                  </div>
                ))}
              </div>
              <div>
                <input
                  type="number"
                  id="mobile-minCapacity"
                  value={minCapacity}
                  onChange={handleCapacityChange}
                  placeholder="Enter Seating Capacity"
                  className="px-3 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
