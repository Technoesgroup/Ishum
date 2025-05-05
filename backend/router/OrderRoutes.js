const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserLatestOrder,
  getDeliveredOrdersCount,
  getAllOrders,
  cancelOrder // 👈 Import cancelOrder controller
} = require('../Controller/OrderController');

// Get latest order of a user
router.get('/user/:userId/latest', getUserLatestOrder);

// Create new order
router.post('/', createOrder);

// Get delivered orders count
router.get('/delivered-count', getDeliveredOrdersCount);

// Get all orders (admin panel)
router.get('/all', getAllOrders);

// ✅ Cancel order by orderId
router.put('/cancel/:orderId', cancelOrder);


module.exports = router;

