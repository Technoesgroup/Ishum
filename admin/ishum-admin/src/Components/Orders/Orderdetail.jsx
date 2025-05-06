// OrderDetails.js

import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to extract the orderId
import '../../CSS/OrderDetails.css'; // Add your custom CSS for styling

const OrderDetails = () => {
  const { orderId } = useParams(); // Extract orderId from the URL

  // Static sample order data for demonstration purposes
  const sampleOrder = {
    id: orderId,
    date: '2 Apr at 7:30 pm',
    customer: 'Customer 1',
    channel: 'Online Store',
    total: '₹5000.00',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Fulfilled',
    items: '3 items',
    deliveryStatus: 'Tracking added',
    deliveryMethod: 'Standard',
    trackingId: 'TRACK12345',
    productName: 'Sample Product',
    productImage: 'https://via.placeholder.com/150', // Placeholder image
    price: '₹1500',
    quantity: 2,
    subtotal: '₹3000',
    shipping: '₹100',
    tax: '₹50',
    total: '₹3150',
    customerName: 'Customer 1',
    email: 'customer1@example.com',
    phone: '123-456-7890',
    shippingAddress: '123 Sample Street, City, Country',
  };

  return (
    <div className="order-details-container">
      <div className="order-header">
        <h2>#{sampleOrder.id}</h2>
        <div className="order-tags">
          <span className="tag paid">Paid</span>
          <span className="tag fulfilled">Fulfilled</span>
          <span className="tag archived">Archived</span>
        </div>
        <div className="order-meta">{sampleOrder.date} from {sampleOrder.channel}</div>
      </div>

      <div className="order-main">
        <div className="left">
          <div className="fulfillment-card">
            <div className="tag-box green">Fulfilled (1)</div>
            <div className="fulfillment-meta">
              <div><strong>Fulfilled</strong><br />{sampleOrder.date}</div>
              <div><strong>Tracking</strong><br />
                <a href={`https://track.com/${sampleOrder.trackingId}`} target="_blank" rel="noopener noreferrer">
                  {sampleOrder.trackingId}
                </a>
              </div>
            </div>
            <div className="product">
              <img src={sampleOrder.productImage} alt={sampleOrder.productName} />
              <div className="product-info">
                <strong>{sampleOrder.productName}</strong>
                <span>{sampleOrder.size} / {sampleOrder.color}</span>
              </div>
              <div className="product-price">
                ₹{sampleOrder.price} × {sampleOrder.quantity}<br />
                ₹{sampleOrder.total}
              </div>
            </div>
          </div>

          <div className="payment-summary">
            <span className="tag paid">Paid</span>
            <table>
              <tbody>
                <tr><td>Subtotal</td><td>₹{sampleOrder.subtotal}</td></tr>
                <tr><td>Shipping</td><td>{sampleOrder.shipping}</td></tr>
                <tr><td>Taxes</td><td>{sampleOrder.tax}</td></tr>
                <tr className="total"><td>Total</td><td>₹{sampleOrder.total}</td></tr>
                <tr><td>Paid</td><td>₹{sampleOrder.total}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="right">
          <div className="notes">
            <h4>Notes</h4>
            <p>No notes from customer</p>
          </div>

          <div className="customer-details">
            <h4>Customer</h4>
            <p><strong>{sampleOrder.customerName}</strong></p>
            <p>{sampleOrder.email}</p>
            <p>{sampleOrder.phone}</p>
            <h4>Shipping Address</h4>
            <p>{sampleOrder.shippingAddress}</p>
            <h4>Billing Address</h4>
            <p>Same as shipping address</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
