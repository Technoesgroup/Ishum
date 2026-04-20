const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

// ✅ Product (multiple fields)
const uploadProduct = upload.fields([
  { name: "image", maxCount: 1 },        // main image
  { name: "thumbnails", maxCount: 6 },   // thumbnails
  { name: "colorImages", maxCount: 30 }, // color variant images
]);

// ✅ Collection / Review (single image)
const uploadSingle = upload.single("image");

module.exports = { uploadProduct, uploadSingle };