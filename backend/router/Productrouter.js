const express = require("express");
const router = express.Router();
const upload = require('../MiddleWare/MulterMiddleWare');
const { addProduct, getProducts, searchProducts } = require("../Controller/ProductController");

// ✅ POST route for adding product with file upload middleware
router.post("/add", upload, addProduct);

// ✅ GET route for fetching products
router.get("/get-product", getProducts);


router.get('/search', searchProducts);

module.exports = router;


