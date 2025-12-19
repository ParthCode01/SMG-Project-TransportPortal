import { useState } from "react";

function RequestVehicle() {
  const [totalVehicles, setTotalVehicles] = useState(1);
  const [uniqueId, setUniqueId] = useState("");
  const [transportPartner, setTransportPartner] = useState("");

  // ✅ store all requests
  const [requests, setRequests] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transportPartner || totalVehicles < 1) return;

    const newRequest = {
      id: Date.now(),
      totalVehicles,
      uniqueId,
      transportPartner,
      status: "Pending", // ✅ default status
      createdAt: new Date().toLocaleString(),
    };

    setRequests((prev) => [newRequest, ...prev]);

    // reset form
    setTotalVehicles(1);
    setUniqueId("");
    setTransportPartner("");
  };

  // status badge color
  const statusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "In Queue":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700"; // Pending
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Request Vehicle Transport
      </h2>

      {/* REQUEST FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border max-w-lg"
      >
        {/* Total Vehicles */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Total Vehicles
          </label>
          <input
            type="number"
            min="1"
            value={totalVehicles}
            onChange={(e) => setTotalVehicles(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Unique ID */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Unique Request ID
          </label>
          <input
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Partner */}
        <div className="mb-6">
          <label className="block font-medium mb-1">
            Transport Partner
          </label>
          <select
            value={transportPartner}
            onChange={(e) => setTransportPartner(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Partner</option>
            <option value="Partner A">Partner A</option>
            <option value="Partner B">Partner B</option>
            <option value="Partner C">Partner C</option>
          </select>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Request Transport
        </button>
      </form>

      {/* REQUEST STATUS LIST */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">
          Requested Transports
        </h3>

        {requests.length === 0 ? (
          <p className="text-gray-500">No requests yet</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Request ID</th>
                <th className="border px-3 py-2">Vehicles</th>
                <th className="border px-3 py-2">Partner</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td className="border px-3 py-2">{r.uniqueId || r.id}</td>
                  <td className="border px-3 py-2 text-center">
                    {r.totalVehicles}
                  </td>
                  <td className="border px-3 py-2">{r.transportPartner}</td>
                  <td className="border px-3 py-2 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                        r.status
                      )}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="border px-3 py-2">{r.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RequestVehicle;
