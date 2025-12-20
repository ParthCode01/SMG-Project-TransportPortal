const DealerOrder = require("../models/dealer_order.model");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const [rows] = await DealerOrder.getAll();
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const [rows] = await DealerOrder.getById(req.params.id);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { dealer_id, vehicle_id, order_status } = req.body;
    const [result] = await DealerOrder.create({ dealer_id, vehicle_id, order_status });
    res.json({ success: true, message: "Order created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const { dealer_id, vehicle_id, order_status } = req.body;
    await DealerOrder.update(req.params.id, { dealer_id, vehicle_id, order_status });
    res.json({ success: true, message: "Order updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    await DealerOrder.delete(req.params.id);
    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
