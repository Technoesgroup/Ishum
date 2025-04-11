import React, { useEffect, useState } from "react";
import "../B-TO-C-Login/LoginUser.css";
import img1 from "../../images/18839a14eab62a1c7d6277c6f8ba14f8.png";
import OtpVerification from "./OtpVerification";

const SignupForm = ({ setShowB2UModal, setShowLoginModal }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 10);
  }, []);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/user/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (data.success) {
        setShowOtp(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    }
  };

  return (
    <div className={`LoginUser-container ${showAnimation ? "show" : ""}`}>
      <div className="LoginUser-form-section">
        {!showOtp ? (
          <>
            <h1 className="LoginUser-title">Login</h1>
            <h2 className="LoginUser-subtitle">your account</h2>

            <input
              type="text"
              placeholder="Enter your Phone Number"
              className="LoginUser-input-field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
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
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google" />
                </button>
                <button className="LoginUser-social-btn">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
                </button>
              </div>
            </div>

            <p className="SignUp-text">
              Don’t have an account?
              <span className="login-link" onClick={() => {
                setShowB2UModal(true);
                setShowLoginModal(false);
              }}>
                &nbsp; Sign Up
              </span>
            </p>
          </>
        ) : (
          <OtpVerification phone={phone} onBack={() => setShowOtp(false)} />
        )}
      </div>

      <div className="LoginUser-image-section">
        <img src={img1} alt="Fashion Model" />
      </div>

      <button className="Login-close-btn" onClick={() => setShowLoginModal(false)}>×</button>
    </div>
  );
};

export default SignupForm;

