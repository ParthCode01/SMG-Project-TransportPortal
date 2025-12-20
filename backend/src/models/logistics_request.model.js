const db = require('../config/db');

exports.getAllRequests = async () => {
  const [rows] = await db.query('SELECT * FROM logistics_requests');
  return rows;
};

exports.createRequest = async ({ vehicle_id, from_location, to_location, request_status }) => {
  const [result] = await db.query(
    'INSERT INTO logistics_requests (vehicle_id, from_location, to_location, request_status) VALUES (?, ?, ?, ?)',
    [vehicle_id, from_location, to_location, request_status || 'pending']
  );
  return result.insertId;
};
