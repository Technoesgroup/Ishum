// BottomNav.jsx
import React from "react";
import "./BottomNav.css";
import { MdStore } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <div className="nav-item">
        <MdStore className="nav-icon" />
        <span>Stores</span>
      </div>
      <div className="nav-item">
        <MdCategory className="nav-icon" />
        <span>Categories</span>
      </div>
      <div className="nav-item">
        <FaTicketAlt className="nav-icon" />
        <span>Offers</span>
      </div>
      <div className="nav-item">
        <FiUser className="nav-icon" />
        <span>Account</span>
      </div>
    </div>
  );
};

export default BottomNav;
