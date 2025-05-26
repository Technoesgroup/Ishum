const express = require("express");
const router = express.Router();
const { addToWishlist,  getWishlistByUserId} = require("../Controller/WishlistController");

router.post("/add", addToWishlist);
router.get("/user/:userId", getWishlistByUserId);

module.exports = router;
