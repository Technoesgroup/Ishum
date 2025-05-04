import React from "react";
import "./OrderTracking.css";

const OrderCard = () => {
  return (
    <div className="order-card">
      <div className="order-header">
        <img
          src="https://m.media-amazon.com/images/I/71RS4Y9bHEL._SX679_.jpg"
          alt="Smartwatch"
          className="order-image"
        />
        <div className="order-info">
          <h2 className="order-product-title">
            Noise Colorfit Icon 2 1.8'' Display with Bluetooth Calling, AI Voice
            Assistant Smartwatch
          </h2>
          <p className="order-product-subtitle">1.8, Jet Black</p>
          <p className="order-product-seller">Seller: TBL Online</p>
          <h3 className="order-product-price">₹1,018</h3>
        </div>
      </div>

      <div className="order-status">
        <div className="status-item confirmed">
          <span className="status-icon">✔</span>
          <span>Order Confirmed, Today, May 04</span>
        </div>

        <div className="status-item cancelled">
          <span className="status-icon">.</span>
          <span>Out for Delivery</span>
        </div>
        <div className="status-item cancelled">
          <span className="status-icon">.</span>
          <span>Cancelled, Today, May 04</span>
        </div>

        <div className="status-item cancelled">
          <span className="status-icon">.</span>
          <span>Delivery, Today By time</span>
        </div>
      </div>

      <div className="order-actions">
        <button className="btn-cn cancel">Cancel Order</button>
        <button className="btn-cn continue">Continue Shopping</button>
      </div>
    </div>
  );
};

export default OrderCard;
