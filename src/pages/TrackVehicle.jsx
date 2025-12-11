import { useState } from "react";
import { trackVehicle } from "../api/vehicleAPI"; 

function TrackVehicle() {
  const [searchId, setSearchId] = useState("");
  const [trackingData, setTrackingData] = useState(null);

const handleSearch = async (e) => {
  e.preventDefault();
    // Temporary mock data (you will replace with API later)
  setTrackingData({
    vehicleNumber: "MH12AB1234",
    uniqueId: searchId,
    partner: "Delhivery",
    status: "In-Transit",
    lastUpdated: "2025-01-15 10:45 AM",
  });
};
  return (
    <div>
      <h2>Track Vehicle</h2>

      {/* Search Box */}
      <form onSubmit={handleSearch} style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter Unique Vehicle ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button}>Search</button>
      </form>

      {/* Tracking Info Box */}
      {trackingData && (
        <div style={styles.card}>
          <p><strong>Vehicle Number:</strong> {trackingData.vehicleNumber}</p>
          <p><strong>Unique ID:</strong> {trackingData.uniqueId}</p>
          <p><strong>Transport Partner:</strong> {trackingData.partner}</p>
          <p><strong>Status:</strong> 
            <span style={styles.badge}>{trackingData.status}</span>
          </p>
          <p><strong>Last Updated:</strong> {trackingData.lastUpdated}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  searchBox: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    background: "#007bff",
    border: "none",
    color: "white",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  badge: {
    background: "#ffc107",
    padding: "5px 10px",
    borderRadius: "5px",
    marginLeft: "8px"
  }
};

export default TrackVehicle;
