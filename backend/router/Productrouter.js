const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addProduct, getProducts } = require("../Controller/ProductController"); // 👈 getProducts import

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST route for adding product
router.post("/add", upload.single("image"), addProduct);

// ✅ GET route for fetching products (with optional filters)
router.get("/get-product", getProducts);

module.exports = router;

