const express = require("express");
const router = express.Router();
const upload = require("../MiddleWare/Multer-2");
const collectionSec = require("../Controller/collectionSecController");

router.get("/get-collectionsSec", collectionSec.getCollectionsSec);
router.post("/add-collectionsSec",upload.single("image"), collectionSec.addCollectionSec);

module.exports = router;
