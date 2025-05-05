import React, { useEffect, useState } from 'react';
import { fetchOnlineOrders } from '../api/adminAPI';
import '../../Pages/Admin/style.css';

const OnlineOrders = () => {
  const [paidOrders, setPaidOrders] = useState([]);
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOnlineOrders();
        setPaidOrders(data?.paid || []);
        setUnpaidOrders(data?.unpaid || []);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-card">
        <h2 className="orders-title">✅ Paid Online Orders</h2>
        <ul className="orders-list">
          {paidOrders.length ? (
            paidOrders.map(order => (
              <li key={order._id} className="orders-item paid">
                <span>Order #{order._id}</span>
                <strong>₹{order.totalAmount}</strong>
              </li>
            ))
          ) : (
            <p>No paid orders found.</p>
          )}
        </ul>
      </div>

      <div className="orders-card">
        <h2 className="orders-title">❌ Unpaid / Declined Orders</h2>
        <ul className="orders-list">
          {unpaidOrders.length ? (
            unpaidOrders.map(order => (
              <li key={order._id} className="orders-item unpaid">
                <span>Order #{order._id}</span>
                <strong>₹{order.totalAmount}</strong>
              </li>
            ))
          ) : (
            <p>No unpaid/declined orders.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OnlineOrders;
