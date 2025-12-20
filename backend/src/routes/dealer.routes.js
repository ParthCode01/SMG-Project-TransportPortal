const express = require('express');
const router = express.Router();
const dealerController = require('../controllers/dealer.controller');

router.get('/', dealerController.getAllOrders);
router.post('/', dealerController.createOrder);

module.exports = router;
