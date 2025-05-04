const express = require('express');
const router = express.Router();
const {
  createOrder,
  getDeliveredOrdersCount,
  getAllOrders
} = require('../Controller/OrderController');

// Create new order
router.post('/', createOrder);

// Get delivered orders count
router.get('/delivered-count', getDeliveredOrdersCount);

// Optional: Get all orders (admin panel)
router.get('/all', getAllOrders);

module.exports = router;
