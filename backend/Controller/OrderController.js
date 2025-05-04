const Order = require('../models/Ordermodel');

exports.createOrder = async (req, res) => {
  console.log("📦 Order create API hit: ", req.body);

  try {
    const { userId, cartItems, totalAmount, paymentInfo } = req.body;

    // Ensure the order structure is correct
    const newOrder = new Order({
      userId,
      items: cartItems,  // 'cartItems' from the request
      amount: totalAmount,  // 'totalAmount' mapped to 'amount'
      paymentId: paymentInfo.paymentId,  // 'paymentInfo.paymentId' mapped to 'paymentId'
    });

    // Save the new order
    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order saved successfully' });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ success: false, message: 'Failed to save order', error: err });
  }
};


// Get all delivered orders count
exports.getDeliveredOrdersCount = async (req, res) => {
  try {
    const count = await Order.countDocuments({ status: 'delivered' });
    res.json({ deliveredOrders: count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to count delivered orders' });
  }
};

// Optional: Get all orders for admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email phone');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
