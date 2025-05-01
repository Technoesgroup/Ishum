import React from 'react';
import './MobileLogin.css';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import CloseIcon from '@mui/icons-material/Close';

const MobileProfile = ({ onClose }) => {
  return (
    <div className="mobile-login-modal-overlay">
      <div className="mobile-login-modal-content mobile-login-container">
        <div className='login-text-button'>
          <div>
            <h2 className='mobile-login-title'>Log into</h2>
            <h2 className='mobile-login-subtitle'>your account</h2>
          </div>
          <button className="mobile-login-close" onClick={onClose}><CloseIcon /></button>
        </div>

        <label className="Phone-input-label">Phone Number</label>
        <input type="text" className="mobile-login-input" placeholder="Enter your phone number" />

        <div className="switch-login">Login by Email?</div>

        <button className="send-otp-button">SEND OTP</button>

        <div className="or-divider">or log in with</div>

        <div className="social-login-buttons">
          <div className="social-button"><GoogleIcon /></div>
          <div className="social-button"><AppleIcon /></div>
          <div className="social-button"><FacebookIcon /></div>
        </div>

        <p className="signup-prompt">
          Don’t have an account? <span className="signup-link">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default MobileProfile;

