import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import './MobileOtp.css';
import { useAuth } from "../../../ContextApiCart/LoginContextApi"; // ✅ Import context
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpLogin = ({ phone = "", name = "", email = "", mode = "login", onClose }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const { setIsLoggedIn, setUser,setToken } = useAuth(); // ✅ Destructure context

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

        // ✅ Set token & user in localStorage
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Update global context
          setToken(data.token); 
        setUser(data.user);
        setIsLoggedIn(true);

        onClose(); // ✅ Close modal
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Verification failed");
    }
  };

  return (
    <div className="mobile-login-modal-overlay">
      <ToastContainer />
      <div className="mobile-login-modal-content Mobile-otp-container">
        <div className="login-text-button">
          <h2>Verification code</h2>
          <button className="mobile-login-close" onClick={onClose}><CloseIcon /></button>
        </div>

        <p>Please enter the verification code sent to your mobile.</p>

        <div className="Mobile-otp-inputs">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, i)}
            />
          ))}
        </div>

        <p className="Mobile-resend-text">Resend in 00:{timer < 10 ? `0${timer}` : timer}</p>

        <button className="Mobile-login-btn" onClick={handleVerify}>VERIFY OTP</button>

        <p className="Mobile-or-text">or log in with</p>

        <div className="Mobile-social-icons">
          <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="Apple" />
          <GoogleIcon />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
        </div>

        <p className="Mobile-signup-text">
          Already have an account? <span className="otp-login-link">Log In</span>
        </p>
      </div>
    </div>
  );
};

export default OtpLogin;



