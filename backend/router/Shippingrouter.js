const express = require("express");
const { saveShipping, getShipping, updateShipping } = require("../Controller/ShippingController");

const router = express.Router();

router.post("/", saveShipping);
router.get("/:userId", getShipping);
router.put("/:userId", updateShipping);

module.exports = router;
