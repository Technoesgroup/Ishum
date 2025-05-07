const express = require('express');
const upload = require('../MiddleWare/Multer-2');
const { getAllReviews, createReview } = require('../Controller/ReveiwController');


const router = express.Router();

router.get('/get-reviews', getAllReviews);
router.post('/create-reviews',upload.single('image'), createReview);

module.exports = router;

