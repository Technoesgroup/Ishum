import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBox, FaTags, FaComments, FaEnvelope,
  FaStar, FaHome, FaUser, FaChevronDown
} from 'react-icons/fa';
import '../../CSS/Sidebar.css';

const Sidebar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-list">

        <li className="active"><FaHome /> Orders</li>

        {/* Products item with dropdown */}
        <li
          className="sidebar-list-item-with-dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="sidebar-item">
            <FaBox /> Products <FaChevronDown className="chevron-icon" />
          </div>
          {showDropdown && (
            <ul className="dropdown-list">
              <li><Link to="/manage-collection">Manage Collection</Link></li>
              <li><Link to="/products/add-product">Add Bulk Products</Link></li>
              <li><Link to="/manage-products">Manage Products</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/Cart-trigger">Add to Cart trigger</Link></li>
         <li><Link  to="User-Id">All User Login Id</Link></li>
        <li><FaTags /> Vouchers</li>
        <li><FaEnvelope /> B2B Inquiries</li>
        <li><FaStar /> Reviews</li>
      </ul>

      <div className="sidebar-footer">
        <FaUser /> Admin
      </div>
    </div>
  );
};

export default Sidebar;
