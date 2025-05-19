import React, { useEffect, useState } from "react";
import "../B-TO-C-Login/LoginUser.css";
import img1 from "../../images/18839a14eab62a1c7d6277c6f8ba14f8.png";
import OtpVerification from "./OtpVerification";
import GoogleIcon from '@mui/icons-material/Google';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = ({ setShowB2UModal, setShowLoginModal }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");

  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 10);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (value.length <= 10) setPhone(value); // max 10 digits
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    const fullPhone = `+91${phone}`;

    try {
      const response = await fetch(`${baseURL}/api/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });

      const data = await response.json();

      if (data.success) {
        setShowOtp(true);
        toast.success("OTP sent successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP");
    }
  };

  return (
    <div className={`LoginUser-container ${showAnimation ? "show" : ""}`}>
      <ToastContainer position="top-center" autoClose={3000} />
      
      <div className="LoginUser-form-section">
        {!showOtp ? (
          <>
            <h1 className="LoginUser-title">Login</h1>
            <h2 className="LoginUser-subtitle">your account</h2>

            <div className="LoginUser-phone-input-wrapper">
              <span className="LoginUser-country-code">+91</span>
              <input
                type="tel"
                placeholder="Enter your 10-digit number"
                className="LoginUser-input-field"
                value={phone}
                onChange={handleChange}
                maxLength={10}
              />
            </div>

            <div className="Login-by-email">
              <a href="#">Login by Email?</a>
            </div>

            <div className="bottom-Data-Loginpage">
              <button className="LoginUser-continue-btn" onClick={handleSendOtp}>
                SEND OTP
              </button>

              <p className="LoginUser-sign-up-text">or log in with</p>

              <div className="LoginUser-social-buttons">
                <button className="LoginUser-social-btn">
                  <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="Apple" />
                </button>
                <button className="LoginUser-social-btn">
                    <GoogleIcon />
                </button>
                <button className="LoginUser-social-btn">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    alt="Facebook"
                  />
                </button>
              </div>
            </div>

            <p className="SignUp-text">
              Don’t have an account?
              <span
                className="login-link"
                onClick={() => {
                  setShowB2UModal(true);
                  setShowLoginModal(false);
                }}
              >
                &nbsp; Sign Up
              </span>
            </p>
          </>
        ) : (
          <OtpVerification
            phone={`+91${phone}`}
            mode="login"
            onBack={() => setShowOtp(false)}
            setShowB2UModal={setShowB2UModal}
            setShowLoginModal={setShowLoginModal}
          />
        )}
      </div>

      <div className="LoginUser-image-section">
        <img src={img1} alt="Fashion Model" />
      </div>

      <button className="Login-close-btn" onClick={() => setShowLoginModal(false)}>
        ×
      </button>
    </div>
  );
};

export default SignupForm;



