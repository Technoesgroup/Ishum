import { useState } from "react";
import "../MyOrder/MyOrder.css";
import img1  from '../../images/Col-2.svg';

const orders = [
  {
    id: 1524,
    name: "Gulzaar - Dark Purple Multicolor Printed Velvet Suit Set With Potli and Dupatta",
    size: 36,
    image:img1,
    color: "Purple",
    quantity: 2,
    date: "13/05/2021",
    trackingNumber: "IK287368838",
    subtotal: 1000,
    status: "Pending",
  },
  {
    id: 1525,
    name: "Gulzaar - Dark Purple Multicolor Printed Velvet Suit Set With Potli and Dupatta",
    size: 38,
    image:img1,
    color: "Red",
    quantity: 1,
    date: "15/05/2021",
    trackingNumber: "IK287368839",
    subtotal: 1200,
    status: "Delivered",
  },
];

const OrderList = () => {
  const [filter, setFilter] = useState("Pending");

  return (
    <div className="order-container">
      <div className="tabs">
        {["Pending", "Delivered", "Cancelled"].map((status) => (
          <button
            key={status}
            className={`tab-button ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      
      {orders.filter(order => order.status === filter).map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-image">
            <img src={order.image} alt="" className="order-images"/>
          </div>
          <div className="order-details">
            <h2 className="order-title">Order #{order.id}</h2>
            <p className="Ordername">{order.name}</p>
            <p  className="Order-Size-Color">Size: {order.size} | Color: {order.color} | Quantity: {order.quantity}</p>
          </div>
          <div className="order-summary">
            <p>{order.date}</p>
            <p>Tracking number: <strong>{order.trackingNumber}</strong></p>
            <p>Subtotal: <strong>Rs.{order.subtotal}</strong></p>
            <p className="order-status">{order.status.toUpperCase()}</p>
            <button className="details-button">Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
