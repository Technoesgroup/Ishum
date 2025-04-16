import React, { useState } from "react";
import axios from "axios";
import "../B-TO-C-Login/RegisterUser.css";
import img1 from '../../images/18839a14eab62a1c7d6277c6f8ba14f8.png';
import OtpVerification from "./OtpVerification";

const SignupForm = ({ setShowB2UModal, setShowLoginModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false); // OTP step
   const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <div className="RegisterUser-container">
   
      <div className="RegisterUser-form-section">
      {!showOtpStep ? (
           <>
        <h1 className="RegisterUser-title">Create</h1>
        <h2 className="RegisterUser-subtitle">your account</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          className="RegisterUser-input-field"
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="RegisterUser-input-field"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="RegisterUser-input-field"
        />

        <button
          className="RegisterUser-continue-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "CONTINUE"}
        </button>

        {message && <p className="RegisterUser-message">{message}</p>}

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
          <span
            className="login-link"
            onClick={() => {
              setShowB2UModal(false);
              setShowLoginModal(true);
            }}
          >
            &nbsp; Log In
          </span>
        </p>
        </>
         ) : (
            <OtpVerification phone={phone} onBack={() => setShowOtpStep(false)} />
        )}
      </div>

      {/* Right Side - Image */}
      <div className="RegisterUser-image-section">
        <img src={img1} alt="Fashion Model" />
      </div>
    </div>
  );
};

export default SignupForm;


