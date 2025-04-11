const userModel = require("../models/UserSchema");
const jwt = require('jsonwebtoken');
const validator = require('validator');
const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// JWT Token creation
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '4d' });
};

// OTP storage object (per phone)
const OTP_STORE = {};

// Generate 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send OTP via Twilio
const sendOtpViaSMS = async (phone, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    console.log("OTP sent:", message.sid);
  } catch (err) {
    console.error("OTP send error:", err.message);
    throw new Error("Failed to send OTP");
  }
};

// 🔸 REGISTER (Step 1 - Send OTP & Store temp data)
const registerUser = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "Name, email & phone required" });
    }

    const exists = await userModel.findOne({ phone });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const otp = generateOTP();
    OTP_STORE[phone] = { name, email, otp };

    await sendOtpViaSMS(phone, otp);

    res.status(200).json({ success: true, message: "OTP sent to phone" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🔸 VERIFY (Step 2 - Validate OTP & Register user)
const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: "Phone and OTP required" });
    }

    const userData = OTP_STORE[phone];
    if (!userData) {
      return res.status(400).json({ success: false, message: "OTP session expired or not found" });
    }

    if (userData.otp !== otp) {
      return res.status(400).json({ success: false, message: "Incorrect OTP" });
    }

    const newUser = new userModel({
      name: userData.name,
      email: userData.email,
      phone: phone,
      isVerified: true
    });

    await newUser.save();

    delete OTP_STORE[phone]; // Clear OTP data

    const token = createToken(newUser._id);
    res.status(200).json({ success: true, message: "User registered", token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Verification failed", error: err.message });
  }
};

// 🔁 RESEND OTP
const resendOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Please provide a phone number' });
    }

    const userData = OTP_STORE[phone];
    if (!userData) {
      return res.status(400).json({ success: false, message: 'User not found or phone number does not match' });
    }

    const newOtp = generateOTP();
    userData.otp = newOtp;
    await sendOtpViaSMS(phone, newOtp);

    res.status(200).json({ success: true, message: 'OTP resent successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while resending OTP' });
  }
};

// 🌟 OPTIONAL: Use this in future to directly send OTP without name/email
const sendOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ success: false, message: 'Phone number required' });

  const otp = generateOTP();
  OTP_STORE[phone] = { otp };

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

module.exports = {
  sendOtp,
  registerUser,
  verifyOtp,
  resendOtp
};

  