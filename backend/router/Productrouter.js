const express = require("express");
const router = express.Router();
const upload = require('../MiddleWare/MulterMiddleWare');
const { addProduct, getProducts } = require("../Controller/ProductController");

// ✅ POST route for adding product with file upload middleware
router.post("/add", upload, addProduct);

// ✅ GET route for fetching products
router.get("/get-product", getProducts);

module.exports = router;


