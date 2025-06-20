const express = require("express");
const router = express.Router();
const { upload, compressImages } = require("../MiddleWare/MulterMiddleWare");
const { addProduct, getProducts,getProductById, searchProducts, getProductBySlug, getSimilarProducts, updateProduct} = require("../Controller/ProductController");

// ✅ POST route for adding product with file upload middleware
router.post("/add", upload, compressImages, addProduct);

// ✅ GET route for fetching products
router.get("/get-product", getProducts);

router.get('/search', searchProducts);

router.put("/update/:id", upload, updateProduct);

router.get("/get-product-by-id/:id", getProductById);

router.get('/slug/:slug', getProductBySlug);

router.get("/similar", getSimilarProducts);

module.exports = router;


