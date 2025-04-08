import React, { useState } from "react";
import "../B-TO-C-Login/RegisterUser.css";
import  img1 from '../../images/18839a14eab62a1c7d6277c6f8ba14f8.png'

const SignupForm = ({ setShowB2UModal, setShowLoginModal }) => { 


  return (
    <div className="RegisterUser-container">
      {/* Left Side - Form */}
      <div className="RegisterUser-form-section">
        <h1 className="RegisterUser-title">Create</h1>
        <h2 className="RegisterUser-subtitle">your account</h2>

        <input type="text" placeholder="Enter your name" className="RegisterUser-input-field" />
        <input type="email" placeholder="Email address" className="RegisterUser-input-field" />
        <input type="tel" placeholder="Phone Number" className="RegisterUser-input-field" />

        <button className="RegisterUser-continue-btn">CONTINUE</button>

        <p className="RegisterUser-sign-up-text">or sign up with</p>

        <div className="RegisterUser-social-buttons">
          <button className="RegisterUser-social-btn">
            <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="Apple" />
          </button>
          <button className="RegisterUser-social-btn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google" />
          </button>
          <button className="RegisterUser-social-btn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
          </button>
        </div>

        <p className="Alreadylogin-text">
          Already have an account? 
          <span className="login-link" onClick={() => {
            setShowB2UModal(false); // Register User Modal ko close karega
              setShowLoginModal(true); // Thodi der baad Login modal open karega
           
          }}>
               &nbsp; Log In
          </span>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="RegisterUser-image-section">
        <img src={img1} alt="Fashion Model" />
      </div>

    </div>
  );
};

export default SignupForm;
