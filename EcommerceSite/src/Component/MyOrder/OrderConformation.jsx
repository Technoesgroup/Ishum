import React, { useEffect, useState } from "react";
import "./OrderConformation.css";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ContextApiCart/LoginContextApi";
import { usePixel } from "../../Component/FacebookPixel/FB-Pixel";
import axios from "axios";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trackEvent } = usePixel(); 
  const [shipping, setShipping] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(null);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "2-digit",
  });

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {


    const orderConfirmed = localStorage.getItem("orderConfirmed");

    if (!orderConfirmed) {
      navigate("/");
    } else {
      setIsConfirmed(true);

      if (user?._id) {
        axios
          .get(`${baseURL}/api/shipping/${user._id}`)
          .then((res) => setShipping(res.data))
          .catch((err) => console.error("Shipping fetch error:", err));
      }

      // ✅ Track Facebook Purchase event
      const storedOrder = localStorage.getItem("orderData");
      if (storedOrder) {
        const order = JSON.parse(storedOrder);
        if (order?.cartItems?.length > 0) {
          trackEvent("Purchase", {
            content_ids: order.cartItems.map(item => item.productId),
            content_type: "product",
            value: order.totalPrice,
            currency: "INR",
            contents: order.cartItems.map(item => ({
              id: item.productId,
              quantity: item.quantity,
              item_price: item.price
            }))
          });
        }
      }
    }


      window.fbq('track', 'Purchase', {
    value: 1000.00,
    currency: 'INR',
  });
  }, [user, navigate, trackEvent]);

  // 🕐 Prevent rendering before confirmation
  if (isConfirmed === null) return null;

  const handleRoute = () => navigate("/MyOrder");
  const handleContinue = () => navigate("/");

  return (
    <div className="Conformation-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="thank-you-box">
          <h2>Thanks for shopping with us!</h2>
          <p>Delivery by <strong>{formattedDate}</strong></p>
          <button className="track-link" onClick={() => navigate("/OrderTracking")}>
            Track & manage order <TrendingFlatIcon />
          </button>
        </div>

        <div className="delivery-box">
          <h3>Delivery by {formattedDate}</h3>
          <button className="continue-btn" onClick={handleContinue}>Continue Shopping</button>
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
            <h3>{shipping?.firstName} {shipping?.lastName}</h3>
            <button className="change-btn">Change</button>
          </div>
          <p>{shipping?.street}</p>
          <p>{shipping?.city}, {shipping?.state}</p>
          <p>{shipping?.House}</p>
          <p>{shipping?.zipCode}</p>
          <p><strong>Phone number:</strong> {shipping?.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;




