import React, { useState } from "react";

const AddPartner = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    vehicle: "",
    serviceArea: "",
    status: "active",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Partner added (frontend only)");
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-3xl font-semibold mb-6">Add New Partner</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 flex flex-col gap-4"
      >
        <input
          name="name"
          placeholder="Partner Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        />

        <input
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="p-3 border rounded"
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 border rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="p-3 border rounded"
        />

        <select
          name="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
          className="p-3 border rounded"
        >
          <option value="">Select Vehicle</option>
          <option value="bike">Bike</option>
          <option value="van">Van</option>
          <option value="truck">Truck</option>
        </select>

        <input
          name="serviceArea"
          placeholder="Service Area"
          value={formData.serviceArea}
          onChange={handleChange}
          className="p-3 border rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-3 border rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Partner
        </button>
      </form>
    </div>
  );
};

export default AddPartner;
