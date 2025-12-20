const User = require("../models/user.model");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await User.getAll();
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const [rows] = await User.getById(req.params.id);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const [result] = await User.create({ name, email, password, role });
    res.json({ success: true, message: "User created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    await User.update(req.params.id, { name, email, password, role });
    res.json({ success: true, message: "User updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
