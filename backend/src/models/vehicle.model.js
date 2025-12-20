const db = require('../config/db');

exports.getAllVehicles = async () => {
  const [rows] = await db.query('SELECT * FROM vehicles');
  return rows;
};

exports.getVehicleById = async (id) => {
  const [rows] = await db.query('SELECT * FROM vehicles WHERE id = ?', [id]);
  return rows[0];
};

exports.createVehicle = async ({ vehicle_number, model, status }) => {
  const [result] = await db.query(
    'INSERT INTO vehicles (vehicle_number, model, status) VALUES (?, ?, ?)',
    [vehicle_number, model, status || 'available']
  );
  return result.insertId;
};
