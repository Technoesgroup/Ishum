// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // image URL or base64 string
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
