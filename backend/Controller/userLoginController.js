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


const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-otp");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching user", error: err.message });
  }
};

const registerUser = async (req, res) => {
  let { name, email, phone } = req.body;

  try {
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "Name, email & phone required" });
    }

    // Always save full number with +91
    if (!phone.startsWith("+91")) {
      phone = "+91" + phone;
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

    await sendOtpViaSMS(phone, otp); // phone already has +91

    res.status(200).json({ success: true, message: "OTP sent to phone" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const socialLogin = async (req, res) => {
  const { provider, socialId, email, name, profilePic } = req.body;

  if (!provider || !socialId || !email) {
    return res.status(400).json({ success: false, message: "Provider, SocialId, and Email required" });
  }

  try {
    let user = await userModel.findOne({ $or: [{ socialId }, { email }] });

    if (user) {
      if (!user.socialId) {
        user.socialId = socialId;
        user.socialProvider = provider;
        await user.save();
      }
    } else {
      // New user → create entry
      user = new userModel({
        name,
        email,
        socialProvider: provider,
        socialId,
        profilePic,
        isVerified: true
      });
      await user.save();
    }

    const token = createToken(user._id);
    res.status(200).json({ success: true, message: "Social login successful", token, user });

  } catch (err) {
    console.error("Social Login Error:", err);
    res.status(500).json({ success: false, message: "Social login failed", error: err.message });
  }
};


const verifyOtp = async (req, res) => {
  const { phone, otp, mode, name, email } = req.body;

  try {
    if (!phone || !otp || !mode) {
      return res.status(400).json({ success: false, message: "Phone, OTP and Mode required" });
    }

    const userData = OTP_STORE[phone];
    if (!userData) {
      return res.status(400).json({ success: false, message: "OTP session expired or not found" });
    }

    if (userData.otp !== otp) {
      return res.status(400).json({ success: false, message: "Incorrect OTP" });
    }

    if (mode === "register") {
      // 🔥 Registration Flow
      if (!name || !email) {
        return res.status(400).json({ success: false, message: "Name and Email required for registration" });
      }

      const existingUser = await userModel.findOne({ phone });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists, please login." });
      }

      const newUser = new userModel({
        name,
        email,
        phone,
        isVerified: true,
      });

      await newUser.save();

      delete OTP_STORE[phone];
      const token = createToken(newUser._id);
      res.status(200).json({ success: true, message: "User registered successfully", token });

    } else if (mode === "login") {
      // 🔥 Login Flow
      const existingUser = await userModel.findOne({ phone });
      if (!existingUser) {
        return res.status(400).json({ success: false, message: "User not found, please register first." });
      }

      delete OTP_STORE[phone];
      const token = createToken(existingUser._id);
      res.status(200).json({ success: true, message: "Login successful", token });
    } else {
      res.status(400).json({ success: false, message: "Invalid mode" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Verification failed", error: err.message });
  }
};


const sendOtp = async (req, res) => {
  const { phone } = req.body;

  // ✅ Check: phone must start with +91 and be 13 characters total (+91 + 10 digits)
  if (!phone || !/^\+91\d{10}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be in +91XXXXXXXXXX format",
    });
  }

  const otp = generateOTP();
  OTP_STORE[phone] = { otp };

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone, // ✅ Already includes +91
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};


module.exports = {
  getUser,
  sendOtp,
  registerUser,
  verifyOtp,
  socialLogin
  // resendOtp
};

  














// 🔁 RESEND OTP
// const resendOtp = async (req, res) => {
//   const { phone } = req.body;

//   try {
//     if (!phone) {
//       return res.status(400).json({ success: false, message: 'Please provide a phone number' });
//     }

//     const userData = OTP_STORE[phone];
//     if (!userData) {
//       return res.status(400).json({ success: false, message: 'User not found or phone number does not match' });
//     }

//     const newOtp = generateOTP();
//     userData.otp = newOtp;
//     await sendOtpViaSMS(phone, newOtp);

//     res.status(200).json({ success: true, message: 'OTP resent successfully' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server error while resending OTP' });
//   }
// };