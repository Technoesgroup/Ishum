const express = require("express");
const router = express.Router();
const upload = require("../MiddleWare/MulterMiddleWare");
const collectionController = require("../Controller/CollectionController");

router.get("/get-collections", collectionController.getCollections);
router.post("/add-collections",  upload, collectionController.addCollection);

module.exports = router;
