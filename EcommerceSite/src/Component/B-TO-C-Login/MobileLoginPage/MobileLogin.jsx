import React, { useState } from "react";
import "./MobileLogin.css";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import CloseIcon from '@mui/icons-material/Close';
import OtpLogin from "./MobileOtp"; // Reuse your OTP component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "../FireBaseAuth/Handlefetch";

const MobileProfile = ({ onClose, onSignupClick }) => {
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
    const { handleGoogleLogin } = useGoogleLogin();

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

  const handleSendOTP = async () => {
    if (!phone || phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
  
    const formattedPhone = `+91${phone}`;
  
    try {
      const response = await fetch(`${baseURL}/api/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formattedPhone }),
      });
  
      const data = await response.json();
      if (data.success) {
        setShowOtp(true);
        toast.success("OTP sent successfully");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    }
  };
  

  return (
    <div className="mobile-login-modal-overlay">
      <ToastContainer />
      <div className="mobile-login-modal-content mobile-login-container">
        {!showOtp ? (
          <>
            <div className="login-text-button">
              <div>
                <h2 className="mobile-login-title">Log into</h2>
                <h2 className="mobile-login-subtitle">your account</h2>
              </div>
              <button className="mobile-login-close" onClick={onClose}>
                <CloseIcon />
              </button>
            </div>

            <div className="mobile-login-phone-input-wrapper">
              <span className="country-code">+91</span>
              <input
                type="text"
                className="mobile-login-input"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                maxLength={10}
              />
            </div>

            <div className="switch-login">Login by Email?</div>

            <button className="send-otp-button" onClick={handleSendOTP}>
              SEND OTP
            </button>

            <div className="or-divider">or log in with</div>

            <div className="social-login-buttons">
              <div className="social-button"><GoogleIcon onClick={handleGoogleLogin} /></div>
              <div className="social-button"><AppleIcon /></div>
              <div className="social-button"><FacebookIcon /></div>
            </div>

            <p className="signup-prompt">
              Don’t have an account? <span className="signup-link" onClick={onSignupClick}>Sign Up</span>
            </p>
          </>
        ) : (
          <OtpLogin
            phone={phone}
            mode="login"
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default MobileProfile;


