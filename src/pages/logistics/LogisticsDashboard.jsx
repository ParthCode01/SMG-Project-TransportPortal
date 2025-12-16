// src/pages/logistics/LogisticsDashboard.jsx
import React from "react";

const LogisticsDashboard = () => {
  const stats = [
    { title: "Total Partners", value: 12 },
    { title: "Active Deliveries", value: 5 },
    { title: "Pending Requests", value: 3 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Logistics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-medium">{s.title}</h2>
            <p className="text-3xl font-bold mt-2">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogisticsDashboard;
