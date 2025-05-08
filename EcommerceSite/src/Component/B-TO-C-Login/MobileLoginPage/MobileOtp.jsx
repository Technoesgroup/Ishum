import React, { useState, useEffect } from "react";
import './MobileOtp.css';
import axios from 'axios';

const OtpVerification = ({ phone, name, email, mode, onBack, onClose }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      setVerifying(true);
      const res = await axios.post("http://localhost:4000/api/user/verify-otp", {
        phone,
        otp,
        mode,
      });

      if (res.data.success) {
        setMessage("OTP verified successfully!");
        // Close the modal or redirect user
        onClose();
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify OTP</h2>
      <p>We’ve sent an OTP to {phone}</p>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="otp-input"
      />

      <button onClick={handleVerify} disabled={verifying}>
        {verifying ? "Verifying..." : "Verify OTP"}
      </button>

      <p style={{ color: 'red' }}>{message}</p>

      <button onClick={onBack} style={{ marginTop: '10px' }}>
        Back
      </button>
    </div>
  );
};

export default OtpVerification;
