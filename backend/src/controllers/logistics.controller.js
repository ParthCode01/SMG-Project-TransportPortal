const LogisticsRequest = require("../models/logistics_request.model");

// Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const [rows] = await LogisticsRequest.getAll();
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get request by ID
exports.getRequestById = async (req, res) => {
  try {
    const [rows] = await LogisticsRequest.getById(req.params.id);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "Request not found" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a new request
exports.createRequest = async (req, res) => {
  try {
    const { vehicle_id, from_location, to_location, request_status } = req.body;
    const [result] = await LogisticsRequest.create({
      vehicle_id,
      from_location,
      to_location,
      request_status
    });
    res.json({ success: true, message: "Request created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a request
exports.updateRequest = async (req, res) => {
  try {
    const { vehicle_id, from_location, to_location, request_status } = req.body;
    await LogisticsRequest.update(req.params.id, {
      vehicle_id,
      from_location,
      to_location,
      request_status
    });
    res.json({ success: true, message: "Request updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a request
exports.deleteRequest = async (req, res) => {
  try {
    await LogisticsRequest.delete(req.params.id);
    res.json({ success: true, message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
