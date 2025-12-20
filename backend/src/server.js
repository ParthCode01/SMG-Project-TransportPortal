const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const dealerRoutes = require('./routes/dealer.routes');
const logisticsRoutes = require('./routes/logistics.routes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/logistics', logisticsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Backend running 🚀' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
