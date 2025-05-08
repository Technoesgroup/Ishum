const Review = require('../models/ReviewModel');

// GET all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching reviews' });
  }
};

// POST a new review
const createReview = async (req, res) => {
  const { rating, title, content, name, location, date } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newReview = new Review({
      rating,
      title,
      content,
      image,
      name,
      location,
      date,
      likes: 0,
      dislikes: 0,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ error: 'Error creating review' });
  }
};

module.exports = {
  getAllReviews,
  createReview,
};

