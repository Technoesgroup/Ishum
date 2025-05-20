import React, { useState, useEffect } from "react";
import { useAuth } from "../../ContextApiCart/LoginContextApi"; 
import "./OtpVerification.css";
import GoogleIcon from '@mui/icons-material/Google';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerification = ({ phone, name, email, mode, onBack, setShowB2UModal, setShowLoginModal }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const { setIsLoggedIn, setUser,setToken } = useAuth();

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const normalizePhone = (phone) => {
    return phone.startsWith("+91") ? phone : `+91${phone}`;
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 4) {
      toast.error("Please enter 4-digit OTP");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone: normalizePhone(phone),
          otp: enteredOtp,
          name,
          email,
          mode
        }),
      });

      const data = await response.json();

    if (data.success) {
  toast.success("OTP Verified ✅");

  // ✅ Correct way to set token and user
  setToken(data.token);      // triggers AuthProvider useEffect
  setUser(data.user);        // sets user instantly, no wait
  setIsLoggedIn(true);       // optional if context already handles this

  setShowB2UModal(false);
  setShowLoginModal(false);
}

    } catch (err) {
      console.error(err);
      toast.error("Verification failed");
    }
  };

  return (
    <div className="otp-verification-container">
      <ToastContainer position="top-center" autoClose={2000} />
      
      <h2 className="otp-title">Verification code</h2>
      <p className="otp-subtitle">
        Please enter the verification code we sent to your mobile number.
      </p>

      <div className="otp-inputs">
        {otp.map((value, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            maxLength={1}
            className="otp-input"
            value={value}
            onChange={(e) => handleChange(e, i)}
          />
        ))}
      </div>

      <p className="otp-resend">Resend in 00:{timer < 10 ? `0${timer}` : timer}</p>

      <div className="verify-btn-login-acount">
        <button className="otp-submit-btn" onClick={handleVerify}>
          VERIFY OTP
        </button>

        <p className="otp-alt-signup">or sign up with</p>
        <div className="otp-socials">
          <button><img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="Apple" /></button>
          <button><GoogleIcon /></button>
          <button><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" /></button>
        </div>

        <p className="otp-login-text">
          Already have account? <span onClick={onBack} className="otp-login-link">Log In</span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;

