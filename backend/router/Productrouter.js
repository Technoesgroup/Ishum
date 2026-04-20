const express = require("express");
const router = express.Router();
const { uploadProduct } = require("../MiddleWare/MulterMiddleWare");
const { addProduct, getProducts,getProductById, searchProducts, getProductBySlug, getSimilarProducts, updateProduct, deleteProduct} = require("../Controller/ProductController");

// ✅ POST route for adding product with file upload middleware
router.post("/add", uploadProduct, addProduct);

// ✅ GET route for fetching products
router.get("/get-product", getProducts);

router.get('/search', searchProducts);

router.get('/delete/:id', deleteProduct);

router.put("/update/:id", uploadProduct, updateProduct);

router.get("/get-product-by-id/:id", getProductById);

router.get('/slug/:slug', getProductBySlug);

router.get("/similar", getSimilarProducts);

module.exports = router;


