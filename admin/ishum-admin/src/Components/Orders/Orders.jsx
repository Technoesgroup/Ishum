import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../CSS/OrdersDashboard.css";

const OrdersDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    axios.get(`${baseURL}/api/orders/all`)
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  const filteredOrders = activeTab === "All"
    ? orders
    : orders.filter(order => order.status === activeTab.toLowerCase());

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="main-content">
      <div className="tabs">
        {["All", "Pending", "Shipped", "Delivered"].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Fulfillment</th>
              <th>Payment</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <tr key={order._id} onClick={() => navigate(`/order/${order._id}`)}>
                <td>{order._id}</td>
                <td>{order.userId?.name || "N/A"}</td>
                <td>{order.userId?.email || "N/A"}</td>
                <td>{order.userId?.phone || "N/A"}</td>
                <td>
                  <span className={`badge ${order.status}`}>{order.status}</span>
                </td>
                <td>
                  <span className="badge paid">Paid</span>
                </td>
                <td>₹{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={currentPage === idx + 1 ? "active" : ""}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdersDashboard;

