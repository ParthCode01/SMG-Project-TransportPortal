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

    // Later: call API here
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Request Vehicle Transport</h2>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

        {/* Vehicle Number */}
        <div style={{ marginBottom: "10px" }}>
          <label>Vehicle Number</label><br />
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="KA01AB1234"
            style={{ width: "300px", padding: "8px" }}
          />
        </div>

        {/* Unique Vehicle ID */}
        <div style={{ marginBottom: "10px" }}>
          <label>Unique Vehicle ID</label><br />
          <input
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            placeholder="123456789"
            style={{ width: "300px", padding: "8px" }}
          />
        </div>

        {/* Transport Partner */}
        <div style={{ marginBottom: "10px" }}>
          <label>Choose Transport Partner</label><br />
          <select
            value={transportPartner}
            onChange={(e) => setTransportPartner(e.target.value)}
            style={{ width: "300px", padding: "8px" }}
          >
            <option value="">Select Partner</option>
            <option value="partner1">Partner A</option>
            <option value="partner2">Partner B</option>
            <option value="partner3">Partner C</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Request Transport
        </button>

      </form>
    </div>
  );
}

export default RequestVehicle;
