import { useState } from "react";

function RequestVehicle() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [transportPartner, setTransportPartner] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      vehicleNumber,
      uniqueId,
      transportPartner,
    });

    // TODO: Call API here
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Request Vehicle Transport
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 max-w-lg"
      >
        {/* Vehicle Number */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Vehicle Number
          </label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="KA01AB1234"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition"
          />
        </div>

        {/* Unique Vehicle ID */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Unique Vehicle ID
          </label>
          <input
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            placeholder="123456789"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition"
          />
        </div>

        {/* Transport Partner */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Choose Transport Partner
          </label>
          <select
            value={transportPartner}
            onChange={(e) => setTransportPartner(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition"
          >
            <option value="">Select Partner</option>
            <option value="partner1">Partner A</option>
            <option value="partner2">Partner B</option>
            <option value="partner3">Partner C</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-md transition"
        >
          Request Transport
        </button>
      </form>
    </div>
  );
}

export default RequestVehicle;
