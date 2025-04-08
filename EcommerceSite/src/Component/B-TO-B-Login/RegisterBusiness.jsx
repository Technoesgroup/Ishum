import React from "react";
import "./RegisterBusiness.css"; // External CSS file

const Register = () => {
  return (
    <div className="B-TO-B-register-container">
      <div className="B-TO-B-image-section"></div>
      <div className="B-TO-B-form-section">
        <div className="B-TO-B-header">
          <span>Existing Customer?</span>
          <button className="B-TO-B-login-btn">Log In</button>
        </div>
        <h2  className="REGISTER-B2B-h2">REGISTER AS B2B CUSTOMER</h2>
        <form>
          <div className="B-TO-B-input-group">
            <div className="B-TO-B-input-field">
              <label>Full Name</label>
              <input type="text" placeholder="Enter Your Full Name" />
            </div>
            <div className="B-TO-B-input-field">
              <label>Email</label>
              <input type="email" placeholder="Enter Your Email" />
            </div>
          </div>
          <div className="B-TO-B-input-group">
            <div className="B-TO-B-input-field">
              <label>Phone Number</label>
              <input type="text" placeholder="Enter Your Phone Number" />
            </div>
            <div className="B-TO-B-input-field">
              <label>Business Name</label>
              <input type="text" placeholder="Enter Your Business Name" />
            </div>
          </div>
          <div className="B-TO-B-input-field full-width">
            <label>GSTIN</label>
            <input type="text" placeholder="Enter Your GST Number (If Available)" />
          </div>
          <button className="B-TO-B-submit-btn">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
