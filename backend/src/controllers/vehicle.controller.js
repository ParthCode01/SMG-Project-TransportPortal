const Vehicle = require("../models/vehicle.model");

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const [rows] = await Vehicle.getAll();
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const [rows] = await Vehicle.getById(req.params.id);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const { vehicle_number, model, status } = req.body;
    const [result] = await Vehicle.create({ vehicle_number, model, status });
    res.json({ success: true, message: "Vehicle created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const { vehicle_number, model, status } = req.body;
    await Vehicle.update(req.params.id, { vehicle_number, model, status });
    res.json({ success: true, message: "Vehicle updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.delete(req.params.id);
    res.json({ success: true, message: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
