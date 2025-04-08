import React, { useEffect, useState } from "react";
import "../B-TO-C-Login/LoginUser.css";
import  img1 from '../../images/18839a14eab62a1c7d6277c6f8ba14f8.png';

const SignupForm = ({setShowB2UModal, setShowLoginModal}) => {

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 10); 
  }, []);


  return (
    <div className={`LoginUser-container ${showAnimation ? "show" : ""}`}>
      <div className="LoginUser-form-section">
        <h1 className="LoginUser-title">Login</h1>
        <h2 className="LoginUser-subtitle">your account</h2>
        
        <input type="text" placeholder="Enter your Phone Number" className="LoginUser-input-field" />
       <div className="Login-by-email"> <a href="">Login by Email?</a></div>
        
     <div  className="bottom-Data-Loginpage">
     <button className="LoginUser-continue-btn">SEND OTP</button>
        
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
            setShowB2UModal(true); // Register User Modal ko close karega
          
              setShowLoginModal(false); // Thodi der baad Login modal open karega
       
          }}>
             &nbsp; Sign Up
          </span>
        </p>

      </div>

      <div className="LoginUser-image-section">
        <img src={img1} alt="Fashion Model" />
      </div>

      <button className="Login-close-btn" onClick={() => setShowLoginModal(false)}>×</button>
    </div>
  );
};

export default SignupForm;