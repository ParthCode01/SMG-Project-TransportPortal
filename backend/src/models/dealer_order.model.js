const db = require('../config/db');

exports.getAllOrders = async () => {
  const [rows] = await db.query('SELECT * FROM dealer_orders');
  return rows;
};

exports.createOrder = async ({ dealer_id, vehicle_id, order_status }) => {
  const [result] = await db.query(
    'INSERT INTO dealer_orders (dealer_id, vehicle_id, order_status) VALUES (?, ?, ?)',
    [dealer_id, vehicle_id, order_status || 'pending']
  );
  return result.insertId;
};
