const Product = require("../models/ProductSchema");

const addProduct = async (req, res) => {
  try {
    const { category, subcategory, color, price, description, size, availability } = req.body;
    const image = req.file?.filename || "";

    const product = new Product({
      category,
      subcategory,
      color,
      image,
      price,
      description,
      size,
      availability: availability === "true" || availability === true // string ya boolean dono handle ho
    });

    await product.save();
    res.status(201).json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: "Failed to add product", error });
  }
};


const getProducts = async (req, res) => {
  try {
    // Query se filters mil rahe honge (e.g., ?category=Suits&color=Red)
    const filters = {};

    if (req.query.category) filters.category = req.query.category;
    if (req.query.subcategory) filters.subcategory = req.query.subcategory;
    if (req.query.color) filters.color = req.query.color;
    if (req.query.availability) filters.availability = req.query.availability === "true";

    if (req.query.minPrice && req.query.maxPrice) {
      filters.price = {
        $gte: parseInt(req.query.minPrice),
        $lte: parseInt(req.query.maxPrice),
      };
    }

    const products = await Product.find(filters);
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products", error });
  }
};

module.exports = {
  addProduct,
  getProducts,
};

