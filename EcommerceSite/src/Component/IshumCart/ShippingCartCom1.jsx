import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../../Style-CSS/IshumCart-css/ShippingCartCom1.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShippingCartCom2 from "./ShippingCartCom2";
import { useAuth } from "../../ContextApiCart/LoginContextApi"; // Import useAuth to get the user

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

export default function ShippingStep() {
  const { user } = useAuth(); // Getting the user from context
  const [activeStep, setActiveStep] = useState("location");
  const [showOverlay, setShowOverlay] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "India",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    shippingMethod: "",
    altPhone: "",
    couponCode: "",
    copyAddress: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleContinue = async () => {
    if (!user || !user._id) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      // Include userId in the payload to be sent to the backend
      const payload = { ...formData, userId: user._id };

      await axios.post("http://localhost:4000/api/shipping", payload);

      setActiveStep("wallet");
      setTimeout(() => {
        setShowOverlay(true);
      }, 500);
    } catch (error) {
      console.error("Shipping data error:", error);
    }
  };

  return (
    <div className="shipping-container">
      <div className="shipping-step-indicators">
        <motion.div animate={{ opacity: activeStep === "location" ? 1 : 0.5 }}>
          <div className="Shipping-icon-line-btw">
            <LocationOnIcon className="icons-of-shipping" />
            <div className="line-btw"></div>
          </div>
        </motion.div>
        <motion.div animate={{ opacity: activeStep === "wallet" ? 1 : 0.5 }}>
          <div className="Shipping-icon-line-btw">
            <PaymentIcon className="icons-of-shipping" />
            <div className="line-btw"></div>
          </div>
        </motion.div>
        <motion.div animate={{ opacity: activeStep === "payment" ? 1 : 0.5 }}>
          <div className="Shipping-icon-line-btw">
            <CheckCircleIcon className="icons-of-shipping" />
          </div>
        </motion.div>
      </div>

      <h2 className="shipping-title">Shipping</h2>

      <div className="Content-of-Shipping">
        <div className="shipping-form-grid">
          <div className="input-wrapper">
            <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} className="shipping-input" />
          </div>
          <div className="input-wrapper">
            <input type="text" placeholder="Last Name (Required)" name="lastName" value={formData.lastName} onChange={handleChange} className="shipping-input shipping-error-border" />
          </div>
          <div className="input-wrapper">
            <select className="shipping-input" name="country" value={formData.country} onChange={handleChange}>
              <option value="India">India</option>
            </select>
          </div>
          <div className="input-wrapper">
            <input type="text" placeholder="Street Name" name="street" value={formData.street} onChange={handleChange} className="shipping-input" />
          </div>
          <div className="input-wrapper">
            <select className="shipping-input" name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="input-wrapper">
            <input type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} className="shipping-input" />
          </div>
          <div className="input-wrapper">
            <input type="text" placeholder="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} className="shipping-input" />
          </div>
          <div className="input-wrapper">
            <input type="text" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} className="shipping-input" />
          </div>
        </div>

        <div className="ShippingData-RightSide">
          <div className="radio-home-other-address">
            <div className="Address-shipping-h3">
              <h3>Shipping Method</h3>
            </div>
            <div className="Address-shipping">
              <input type="radio" name="shippingMethod" value="home" onChange={handleChange} />
              <span>
                <h4>Save as home Address</h4>
                <p>Delivery from 10 to 15 business days</p>
              </span>
            </div>
            <div className="Address-shipping">
              <input type="radio" name="shippingMethod" value="other" onChange={handleChange} />
              <h4>Save as Office Address</h4>
            </div>
          </div>

          <div className="Coupon-Code">
            <h3>Coupon Code</h3>
            <input type="text" name="couponCode" placeholder="Have a code? type it here..." value={formData.couponCode} onChange={handleChange} />
          </div>

          <div className="shipping-checkbox-container">
            <h3>Billing Address</h3><br />
            <div className="shipping-checkbox">
              <input type="checkbox" name="copyAddress" id="copyAddress" checked={formData.copyAddress} onChange={handleChange} />
              <label htmlFor="copyAddress">Copy address data from shipping</label>
            </div>
          </div>

          <button className="shipping-continue-button" onClick={handleContinue}>
            Continue to Payment
          </button>
        </div>
      </div>

      {showOverlay && <ShippingCartCom2 onClose={() => setShowOverlay(false)} />}
    </div>
  );
}


