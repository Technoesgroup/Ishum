const express = require("express");
const router = express.Router();
const upload = require("../MiddleWare/MulterMiddleWare");
const collectionSecController = require("../Controller/collectionSecController");

router.get("/get-collectionsSec", collectionSecController.getCollectionsSec);
router.post("/add-collectionsSec", upload, collectionSecController.addCollectionSec);

module.exports = router;
