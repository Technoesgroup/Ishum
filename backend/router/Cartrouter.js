const express = require('express');
const router = express.Router();
const cartController = require('../Controller/CartController');

router.post('/addtocart', cartController.addToCart);
router.delete('/:userId/:productId', cartController.removeFromCart);
router.get('/:userId', cartController.getCart);

module.exports = router;
