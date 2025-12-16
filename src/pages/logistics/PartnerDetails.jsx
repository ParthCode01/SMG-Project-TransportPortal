// src/pages/logistics/PartnerDetails.jsx
import React from "react";

const PartnerDetails = () => {
  const partner = {
    name: "John Doe",
    company: "SpeedX Delivery",
    phone: "9876543210",
    email: "john@speedx.com",
    vehicle: "Truck",
    area: "Mumbai",
    status: "active",
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-3xl font-semibold mb-6">Partner Details</h1>

      <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-2">
        <p><strong>Name:</strong> {partner.name}</p>
        <p><strong>Company:</strong> {partner.company}</p>
        <p><strong>Email:</strong> {partner.email}</p>
        <p><strong>Phone:</strong> {partner.phone}</p>
        <p><strong>Vehicle:</strong> {partner.vehicle}</p>
        <p><strong>Service Area:</strong> {partner.area}</p>

        <div className="mt-4">
          <span
            className={`px-3 py-1 rounded text-white ${
              partner.status === "active" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {partner.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
