const Wishlist = require("../models/Wishlist");
const Product = require("../models/ProductSchema");

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if product already exists in wishlist
    const exists = await Wishlist.findOne({ userId, productId });
    if (exists) {
      return res.status(200).json({ message: "Already in wishlist" });
    }

    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();

    res.status(201).json({ message: "Added to wishlist" });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const getWishlistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

      console.log("Fetching wishlist for user:", userId);
    // Populate product details from productId reference
    const wishlist = await Wishlist.find({ userId }).populate("productId");

    res.status(200).json({ wishlist });
  } catch (err) {
    res.status(500).json({ message: "Error fetching wishlist", error: err.message });
  }
};


module.exports = { addToWishlist, getWishlistByUserId };

