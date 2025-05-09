import React, { useState } from 'react';
import './SignUp.css';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import OtpVerification from './MobileOtp';

const MobileProfile = ({ onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, email, phone } = formData;
    if (!name || !email || !phone) {
      setMessage("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/api/user/register", {
        name,
        email,
        phone,
      });

      setMessage(response.data.message);

      if (response.data.success) {
        setShowOtpStep(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (showOtpStep) {
    return (
      <OtpVerification
      phone={formData.phone}
      name={formData.name}
      email={formData.email}
      mode="register"
      onBack={() => setShowOtpStep(false)}
      onClose={onClose}
    />
    
    );
  }

  return (
    <div className="mobile-signUp-modal-overlay">
      <div className="mobile-signUp-modal-content mobile-signUp-container">
        <div className='signUp-text-button'>
          <div>
            <h2 className='mobile-signUp-title'>Create</h2>
            <h2 className='mobile-signUp-subtitle'>your account</h2>
          </div>
          <button className="mobile-signUp-close" onClick={onClose}><CloseIcon /></button>
        </div>

        <label className="Phone-input-label">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mobile-signUp-input" placeholder="Enter your name" />

        <label className="Phone-input-label">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="mobile-signUp-input" placeholder="Enter your email" />

        <label className="Phone-input-label">Phone Number</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mobile-signUp-input" placeholder="Enter your phone number" />

        <button className="send-otp-button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending OTP..." : "SIGN UP"}
        </button>

        {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}

        <div className="or-divider">or sign up with</div>

        <div className="social-signUp-buttons">
          <div className="social-button"><GoogleIcon /></div>
          <div className="social-button"><AppleIcon /></div>
          <div className="social-button"><FacebookIcon /></div>
        </div>

        <p className="signup-prompt">
          Already have an account? <span className="signup-link" onClick={onLoginClick}>Log In</span>
        </p>
      </div>
    </div>
  );
};

export default MobileProfile;

