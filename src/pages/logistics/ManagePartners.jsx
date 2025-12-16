import React from "react";

const ManagePartners = () => {
  const partners = [
    { id: 1, name: "John", company: "SpeedX", status: "active" },
    { id: 2, name: "Aman", company: "FastTrack", status: "inactive" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Partners</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Company</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.company}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      p.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePartners;
