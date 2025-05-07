import express from 'express';
import { getAllReviews, createReview } from '../Controller/ReveiwController';

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', createReview);

export default router;
