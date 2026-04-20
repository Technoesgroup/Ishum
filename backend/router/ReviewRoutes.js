const express = require('express');
const { uploadSingle, uploadProduct } = require("../MiddleWare/MulterMiddleWare");
const { getAllReviews, createReview } = require('../Controller/ReveiwController');
// const protect = require('../MiddleWare/MiddleWare'); 


const router = express.Router();

router.get('/get-reviews/:productId', getAllReviews); // 👈 Add :productId

router.post('/create-reviews', uploadSingle, createReview);



module.exports = router;

