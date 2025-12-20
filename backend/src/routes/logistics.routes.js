const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logistics.controller');

router.get('/', logisticsController.getAllRequests);
router.post('/', logisticsController.createRequest);

module.exports = router;
