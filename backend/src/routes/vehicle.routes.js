const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');

router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.post('/', vehicleController.createVehicle);

module.exports = router;
