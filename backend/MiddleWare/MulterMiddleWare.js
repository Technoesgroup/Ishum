const multer = require('multer');
const path = require('path');

// Disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 16823238.jpg
  }
});

// Optional file filter
const fileFilter = (req, file, cb) => {
  console.log('Uploaded file:', file.originalname);
  cb(null, true);
};

// Remove file size limit
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([
  { name: 'image', maxCount: 1 },
  { name: "thumbnails", maxCount: 4 },
  { name: "colorImages", maxCount: 20 }
]);

module.exports = upload;




