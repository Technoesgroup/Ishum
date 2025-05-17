const express = require("express");
const router = express.Router();
const { upload, compressImages } = require("../MiddleWare/Multer-2");
const collection = require("../Controller/CollectionController");

router.get("/get-collections", collection.getCollections);
router.post("/add-collections", upload.single("image"),compressImages, collection.addCollection);

module.exports = router;
