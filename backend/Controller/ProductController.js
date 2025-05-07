const Product = require("../models/ProductSchema");
const Collection = require("../models/CollectionSchema1");

const addProduct = async (req, res) => {
  try {
    const { 
      name, 
      category, 
      subcategory, 
      color, 
      discount, 
      price, 
      description, 
      size, 
      availability, 
      collectionName, 
      isBestseller, 
      isExclusive, 
      isIshumStore 
    } = req.body;

    // Main image
    const image = req.files?.['image']?.[0]?.filename || "";

    // Thumbnails
    const thumbnails = req.files?.['thumbnails']?.map(file => file.filename) || [];

    // Color Images
    const colorImages = [];
    const uploadedColorImages = req.files?.['colorImages'] || [];
    const colorNames = req.body?.['colorNames'] || [];

    if (Array.isArray(colorNames) && colorNames.length !== uploadedColorImages.length) {
      return res.status(400).json({ 
        success: false, 
        message: "Color names aur images ka count match nahi kar raha" 
      });
    }
    
    
    for (let i = 0; i < uploadedColorImages.length; i++) {
      const file = uploadedColorImages[i];
      const colorName = Array.isArray(colorNames) ? colorNames[i] : colorNames;
    
      if (file && colorName) {
        colorImages.push({
          image: file.filename,
          colorName: colorName,
        });
      }
    }
    

    // Save to DB
    const product = new Product({
      name,
      category,
      subcategory,
      color,
      image, 
      discount,
      price,
      description,
      size,
      availability: availability === "true" || availability === true, 
      collectionName,
      isBestseller: isBestseller === "true" || isBestseller === true,
      isExclusive: isExclusive === "true" || isExclusive === true,
      isIshumStore: isIshumStore === "true" || isIshumStore === true,
      thumbnails,
      colorImages
    });

    await product.save();
    res.status(201).json({ success: true, message: "Product added successfully", product });

  } catch (error) {
    console.error("Error in addProduct:", error.message);
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Failed to add product", error: error.message });
  }
};


const getProducts = async (req, res) => {
  try {
    const filters = {};

    if (req.query.isBestseller) filters.isBestseller = req.query.isBestseller === "true";
    if (req.query.isExclusive) filters.isExclusive = req.query.isExclusive === "true";
    if (req.query.isIshumStore) filters.isIshumStore = req.query.isIshumStore === "true";
    if (req.query.category) filters.category = req.query.category;
    if (req.query.subcategory) filters.subcategory = req.query.subcategory;
    if (req.query.color) filters.color = req.query.color;
    if (req.query.availability) filters.availability = req.query.availability === "true";

    // Handle collectionName if it's a reference
    console.log("fillteer  of  get product:", filters)
    if (req.query.collectionName) {
      const collection = await Collection.findOne({
        title: { $regex: new RegExp(`^${req.query.collectionName}$`, 'i') },
      });
    
      if (collection) {
        filters.collectionName = collection._id;
      } else {
        filters.collectionName = null; 
      }
    }
    

    if (req.query.minPrice && req.query.maxPrice) {
      filters.price = {
        $gte: parseInt(req.query.minPrice),
        $lte: parseInt(req.query.maxPrice),
      };
    }


    const products = await Product.find(filters).populate("collectionName");

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



