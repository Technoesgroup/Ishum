const express = require('express');
const router = express.Router();
const verifyToken = require("../MiddleWare/MiddleWare");
const {
  createOrder,
  getUserLatestOrder,
  getDeliveredOrdersCount,
  getAllOrders,
  updateOrderStatus,
   getMyOrders,
  cancelOrder // 👈 Import cancelOrder controller
} = require('../Controller/OrderController');

// Get latest order of a user
router.get('/user/:userId/latest', getUserLatestOrder);  

// Create new order
router.post('/', createOrder);

router.get("/my-orders", verifyToken, getMyOrders);

// Get delivered orders count
router.get('/delivered-count', getDeliveredOrdersCount);

// Get all orders (admin panel)
router.get('/all', getAllOrders);

router.put('/update-status/:orderId', updateOrderStatus);

// ✅ Cancel order by orderId
router.put('/cancel/:orderId', cancelOrder);


module.exports = router;

