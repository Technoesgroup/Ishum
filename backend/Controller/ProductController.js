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

    
    const image = req.files?.['image']?.[0]?.filename || "";

   
    const thumbnails = req.files?.['thumbnails']?.map(file => file.filename) || [];

  
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
    // console.log("fillteer  of  get product:", filters)


    if (req.query.collectionName) {
      const titleQuery = req.query.collectionName.replace(/\s+/g, ' ').trim();
      const collection = await Collection.findOne({
        title: new RegExp(`^${titleQuery}$`, "i"),
      });
    
      if (collection) {
        filters.collectionName = collection._id;
        // console.log("Matched collection:", collection.title);
        // console.log("Matched collection ID:", collection._id);
      } else {
        return res.json({ products: [] });
      }
    }
    
    
    
    

    if (req.query.minPrice && req.query.maxPrice) {
      filters.price = {
        $gte: parseInt(req.query.minPrice),
        $lte: parseInt(req.query.maxPrice),
      };
    }


    const products = await Product.find(filters).populate("collectionName");
    // console.log("Fetched products count:", products.length);

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products", error });
  }
};



const searchProducts = async (req, res) => {
  const { q } = req.query;

  // If no query string, return an empty array
  if (!q) {
    return res.status(200).json([]);
  }

  try {
  
    const regex = new RegExp(q, 'i');

    // Querying the products collection with a case-insensitive search on multiple fields
    const products = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { category: { $regex: regex } },
        { subcategory: { $regex: regex } },
        { description: { $regex: regex } },
        { color: { $regex: regex } }
      ]
    });

    // Log the details for debugging
    console.log("Search query:", q);
    console.log("Matched regex:", regex);
    console.log("Found products:", products.length);

    // If no products are found, return an empty array
    if (products.length === 0) {
      return res.status(200).json([]);
    }

    // Return the found products as JSON
    return res.status(200).json(products);

  } catch (error) {
    // Catching any errors and logging them for debugging
    console.error("Error during search query:", error);

    // Sending a 500 Internal Server Error if something goes wrong
    return res.status(500).json({ message: "Server error during search", error: error.message });
  }
};



module.exports = {
  addProduct,
  searchProducts,
  getProducts,
};



