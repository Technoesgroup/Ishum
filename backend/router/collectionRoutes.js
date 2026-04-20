const express = require("express");
const router = express.Router();
const { uploadSingle } = require("../MiddleWare/MulterMiddleWare");
const collection = require("../Controller/CollectionController");

router.get("/get-collections", collection.getCollections);
router.post("/add-collections", uploadSingle, collection.addCollection);
router.put('/edit/:id', uploadSingle, collection.updateCollection);

module.exports = router;
