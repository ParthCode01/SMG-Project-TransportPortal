import { useState } from "react";
// import { trackVehicle } from "../api/vehicleAPI"; // Uncomment when API ready

function TrackVehicle() {
  const [searchId, setSearchId] = useState("");
  const [trackingData, setTrackingData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    // Temporary mock data (replace with API later)
    setTrackingData({
      vehicleNumber: "MH12AB1234",
      uniqueId: searchId,
      partner: "Delhivery",
      status: "In-Transit",
      lastUpdated: "2025-01-15 10:45 AM",
    });
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Track Vehicle
      </h2>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mb-6">
        <input
          type="text"
          placeholder="Enter Unique Vehicle ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand transition"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-brand hover:bg-brand-dark text-white font-semibold rounded-md transition"
        >
          Search
        </button>
      </form>

      {/* Tracking Info Card */}
      {trackingData && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 max-w-md transition">
          <p className="mb-2">
            <span className="font-medium">Vehicle Number:</span>{" "}
            {trackingData.vehicleNumber}
          </p>
          <p className="mb-2">
            <span className="font-medium">Unique ID:</span> {trackingData.uniqueId}
          </p>
          <p className="mb-2">
            <span className="font-medium">Transport Partner:</span>{" "}
            {trackingData.partner}
          </p>
          <p className="mb-2">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`px-3 py-1 rounded-full text-white font-semibold ${
                trackingData.status === "In-Transit"
                  ? "bg-yellow-500"
                  : trackingData.status === "Delivered"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {trackingData.status}
            </span>
          </p>
          <p className="mb-0">
            <span className="font-medium">Last Updated:</span> {trackingData.lastUpdated}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrackVehicle;
