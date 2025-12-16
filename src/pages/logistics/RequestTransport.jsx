// src/pages/logistics/RequestTransport.jsx
import React, { useState } from "react";

const RequestTransport = () => {
  const [form, setForm] = useState({
    partner: "",
    pickup: "",
    drop: "",
    goods: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Transport request created (frontend only)");
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-3xl font-semibold mb-6">Request Transport</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 flex flex-col gap-4"
      >
        <select
          name="partner"
          className="p-3 border rounded"
          value={form.partner}
          onChange={handleChange}
          required
        >
          <option value="">Select Partner</option>
          <option value="1">John (SpeedX)</option>
          <option value="2">Aman (FastTrack)</option>
        </select>

        <input
          name="pickup"
          placeholder="Pickup Location"
          className="p-3 border rounded"
          onChange={handleChange}
          value={form.pickup}
          required
        />

        <input
          name="drop"
          placeholder="Drop Location"
          className="p-3 border rounded"
          onChange={handleChange}
          value={form.drop}
          required
        />

        <input
          name="goods"
          placeholder="Goods Description"
          className="p-3 border rounded"
          onChange={handleChange}
          value={form.goods}
          required
        />

        <button className="py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestTransport;
