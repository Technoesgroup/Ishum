import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/OrdersDashboard.css"

const generateDummyOrders = () => {
  const statuses = ["Fulfilled", "Unfulfilled"];
  const payments = ["Paid", "Pending"];
  return Array.from({ length: 20 }, (_, i) => ({
    id: `ORD-${1000 + i}`,
    customer: `Customer ${i + 1}`,
    date: `2024-05-${(i % 30) + 1}`,
    fulfillmentStatus: statuses[i % 2],
    paymentStatus: payments[i % 2],
    total: `$${(Math.random() * 100).toFixed(2)}`,
  }));
};

const OrdersDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [orders] = useState(generateDummyOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const filteredOrders = activeTab === "All"
    ? orders
    : orders.filter(order => order.fulfillmentStatus === activeTab);

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="main-content">
      <div className="tabs">
        {["All", "Fulfilled", "Unfulfilled"].map(tab => (
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
              <th>Date</th>
              <th>Fulfillment</th>
              <th>Payment</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <tr key={order.id} onClick={() => navigate(`/order/${order.id}`)}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`badge ${order.fulfillmentStatus.toLowerCase()}`}>
                    {order.fulfillmentStatus}
                  </span>
                </td>
                <td>
                  <span className={`badge ${order.paymentStatus.toLowerCase()}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>{order.total}</td>
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
