const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    trim: true
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    // required: true,
    unique: true
  },
  otp: {
    type: String
  },
  otpExpiresAt: {
    type: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.models.userModel || mongoose.model('userModel', userSchema);
module.exports = userModel;


