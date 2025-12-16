import React from "react";

const LogisticsDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Logistics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-medium">Total Partners</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-medium">Active Deliveries</h2>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-medium">Pending Requests</h2>
          <p className="text-3xl font-bold mt-2">3</p>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
