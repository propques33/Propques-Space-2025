import React, { useState } from "react";

function InventoryTable({ property }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (idx) =>
    setExpandedRows((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <>
      {property.inventory?.length > 0 && (
        <div className="overflow-x-auto mt-2  bg-white z-10">
          <table className="min-w-full text-sm relative text-left border border-[#20B1EE] rounded">
            <thead className="bg-[#20B1EE]  top-10 text-gray-100 font-medium">
              <tr className="">
                <th className="px-2 py-1 border border-zinc-50 font-medium">Asset Name</th>
                <th className="px-2 py-1 border border-zinc-50 font-medium">Manager Cabins</th>
                <th className="px-2 py-1 border border-zinc-50 font-medium">Workstations</th>
                <th className="px-2 py-1 border border-zinc-50 font-medium">Occupied</th>
                <th className="px-2 py-1 border border-zinc-50 font-medium">Available</th>
                <th className="px-2 py-1 border border-zinc-50 font-medium">Total Capacity</th>
                <th className="px-2 py-1 border border-zinc-50 font-medium">Floor</th>
                <th className="px-2 py-1 border border-zinc-50 font-medium">Breakdown</th>
              </tr>
            </thead>
            <tbody>
              {property.inventory.map((item, idx) => {
                const cabinInfo =
                  item.managerCabins && item.managerCabins.length > 0
                    ? item.managerCabins
                        .map(
                          (c) =>
                            `${c.managerName} (${c.occupied}/${c.capacity})`
                        )
                        .join(", ")
                    : "-";

                const roomInfo =
                  item.rooms && item.rooms.length > 0
                    ? item.rooms
                        .map(
                          (r) =>
                            `${r.roomType} (${r.occupied}/${r.capacity})`
                        )
                        .join(", ")
                    : "-";

                const occupiedCabins = (item.managerCabins || []).reduce(
                  (sum, c) => sum + Number(c.occupied),
                  0
                );
                const occupiedRooms = (item.rooms || []).reduce(
                  (sum, r) => sum + Number(r.occupied),
                  0
                );
                const computedOccupied = occupiedCabins + occupiedRooms;

                const computedTotalCapacity =
                  Number(item.totalCapacity) ||
                  (item.managerCabins || []).reduce(
                    (sum, c) => sum + Number(c.capacity),
                    0
                  ) +
                    (item.rooms || []).reduce(
                      (sum, r) => sum + Number(r.capacity),
                      0
                    );

                const computedAvailable = computedTotalCapacity - computedOccupied;

                // Breakdown details
                const availableCabins = (item.managerCabins || []).filter(
                  (c) => Number(c.capacity) - Number(c.occupied) > 0
                );
                const availableRooms = (item.rooms || []).filter(
                  (r) => Number(r.capacity) - Number(r.occupied) > 0
                );

                return (
                  <React.Fragment key={idx}>
                    <tr className="border-t">
                      <td className="px-2 py-1 border-1 border-[#20B1EE]">{item.assetName}</td>
                      <td className="px-2 py-1 border-1 border-[#20B1EE]  ">{cabinInfo}</td>
                      <td className="px-2 py-1 border-1 border-[#20B1EE]">{roomInfo}</td>
                      <td className="px-2 py-1 border-1 border-[#20B1EE]">{computedOccupied}</td>
                      <td className="px-2 py-1 border-1 border-[#20B1EE]">{computedAvailable}</td>
                      <td className="px-2 py-1 border-1 border-[#20B1EE]">{computedTotalCapacity}</td>
                      <td className="px-2 py-1 border-1 border-[#20B1EE]">
                        {item.metadata?.floor ?? "-"}
                      </td>
                      <td className="px-2 py-1 border-1 border-[#20B1EE]">
                        {computedAvailable > 0 && (
                          <button
                            onClick={() => toggleRow(idx)}
                            className="text-blue-500 underline"
                          >
                            {expandedRows[idx] ? "Hide" : "Show"}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expandedRows[idx] && (
                      <tr>
                        <td colSpan="8" className="bg-gray-50 p-2">
                          <div className="mb-1 font-semibold">
                            Available Seats Breakdown:
                          </div>
                          <div>
                            <strong>Manager Cabins:</strong>
                            <ul className="list-disc list-inside">
                              {availableCabins.length > 0 ? (
                                availableCabins.map((c, i) => (
                                  <li key={`cab-${i}`}>
                                    {c.managerName}:{" "}
                                    <p className="font-semibold inline capitalize">
                                    {c.capacity - c.occupied} seater available
                                    </p>
                                  </li>
                                ))
                              ) : (
                                <li>No available manager cabins</li>
                              )}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <strong>Workstations:</strong>
                            <ul className="list-disc list-inside">
                              {availableRooms.length > 0 ? (
                                availableRooms.map((r, i) => (
                                  <li key={`room-${i}`}>
                                    {r.roomType}:{" "} 
                                    <p className="font-semibold inline capitalize">
                                      {r.capacity - r.occupied}{" "} seater
                                    available
                                    </p>
                                  </li>
                                ))
                              ) : (
                                <li>No available workstations</li>
                              )}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default InventoryTable;
