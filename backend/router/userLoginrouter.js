const express = require('express');
const {
    registerUser,
    verifyOtp,
    resendOtp,
    sendOtp
} = require('../Controller/userLoginController');

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/resend-otp", resendOtp);
userRouter.post("/send-otp", sendOtp); // Optional OTP route

module.exports = userRouter;
