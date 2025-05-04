import React from "react";
import "./OrderConformation.css";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {

    const navigate = useNavigate();

    const handleRoute = ()=>{
        navigate("/MyOrder");
    }
  return (
    <div className="Conformation-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="thank-you-box">
          <h2>Thanks for shopping with us!</h2>
          <p>Delivery by <strong>Sun, May 4th '25</strong></p>
          <a href="#" className="track-link">Track & manage order <TrendingFlatIcon /></a>
        </div>

        <div className="delivery-box">
          <h3>Delivery by Sun, May 4th '25</h3>
          <button className="continue-btn">Continue Shopping</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="orders-box">
          <p className="orders-text">Why call? Just click!</p>
          <button className="orders-btn" onClick={handleRoute}>Go to My Orders</button>
        </div>

        <div className="address-box">
          <div className="address-header">
            <h3>Harsh Rajput</h3>
            <button className="change-btn">Change</button>
          </div>
          <p>Hati mandir, Mamura</p>
          <p>Pawar Clinic, Mamura, Hathi Wala Mandir</p>
          <p>Noida</p>
          <p>Uttar Pradesh - 201301</p>
          <p><strong>Phone number:</strong> 9458006097</p>
          <button className="add-number-btn">Change or Add number</button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
