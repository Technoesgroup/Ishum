const Product = require("../models/ProductSchema");
const Collection = require("../models/CollectionSchema1");
const mongoose = require('mongoose'); 
const slugify = require("slugify");

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

        const slugBase = slugify(name, { lower: true, strict: true });
    const uniqueSuffix = new mongoose.Types.ObjectId().toString().slice(-6);
    const slug = `${slugBase}-${uniqueSuffix}`;
   

    const product = new Product({
      name,
      slug,
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
      colorImages,
    });

    await product.save();
    res.status(201).json({ success: true, message: "Product added successfully", product });

  } catch (error) {
    console.error("Error in addProduct:", error.message);
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Failed to add product", error: error.message });
  }
};


const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug: req.params.slug }).populate("collectionName");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product by slug:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
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
        title: new RegExp(titleQuery, "i"),
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


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
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
      isIshumStore,
    } = req.body;

    const updateFields = {
      ...(name && { name }),
      ...(category && { category }),
      ...(subcategory && { subcategory }),
      ...(color && { color }),
      ...(discount && { discount }),
      ...(price && { price }),
      ...(description && { description }),
      ...(size && { size }),
      ...(availability !== undefined && { availability: availability === "true" || availability === true }),
      ...(isBestseller !== undefined && { isBestseller: isBestseller === "true" || isBestseller === true }),
      ...(isExclusive !== undefined && { isExclusive: isExclusive === "true" || isExclusive === true }),
      ...(isIshumStore !== undefined && { isIshumStore: isIshumStore === "true" || isIshumStore === true }),
    };

    // Handle collection name (if sent)
    if (collectionName) {
      const found = await Collection.findOne({ title: new RegExp(collectionName, "i") });
      if (found) updateFields.collectionName = found._id;
    }

    // Main image
    if (req.files?.['image']?.[0]) {
      updateFields.image = req.files['image'][0].filename;
    }

    // Thumbnails
    if (req.files?.['thumbnails']) {
      updateFields.thumbnails = req.files['thumbnails'].map(file => file.filename);
    }

    // Color images
    const uploadedColorImages = req.files?.['colorImages'] || [];
    const colorNames = req.body?.['colorNames'] || [];
    const colorImages = [];

    if (Array.isArray(colorNames) && colorNames.length !== uploadedColorImages.length) {
      return res.status(400).json({
        success: false,
        message: "Color names and images count mismatch.",
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

    if (colorImages.length > 0) {
      updateFields.colorImages = colorImages;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ success: false, message: "Failed to update product", error: error.message });
  }
};


const getSimilarProducts = async (req, res) => {
  try {
    const { subcategory, name } = req.query; 
    if (!subcategory || !name) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const query = {
      subcategory,
      name: { $ne: name } 
    };
    const products = await Product.find(query).limit(8);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res.status(500).json({ error: "Server error" });
  }
};



const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete product", error: error.message });
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
    // console.log("Search query:", q);
    // console.log("Matched regex:", regex);
    // console.log("Found products:", products.length);

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
  getProductBySlug,
  updateProduct,
  getProductById,
  deleteProduct,
  getSimilarProducts
};



