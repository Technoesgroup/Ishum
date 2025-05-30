const express = require('express');
const router = express.Router();
const wishlistController = require('../Controller/WishlistController');

router.post('/add', wishlistController.addToWishlist);
router.delete('/remove/:userId/:productId', wishlistController.removeFromWishlist);
router.get('/:userId', wishlistController.getWishlistByUserId);

module.exports = router;

