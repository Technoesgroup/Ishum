const express = require('express');
const {
    registerUser,
    verifyOtp,
    resendOtp,
    sendOtp,
    getUser
} = require('../Controller/userLoginController');
const authMiddleware = require('../MiddleWare/MiddleWare');

const userRouter = express.Router();


userRouter.get("/get-user", authMiddleware, getUser);
userRouter.post("/register", registerUser);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/resend-otp", resendOtp);
userRouter.post("/send-otp", sendOtp); // Optional OTP route

module.exports = userRouter;
