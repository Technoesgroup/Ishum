// BottomNavbar.jsx
import React from "react";
import '../Style-CSS/Navbarbottom.css';
import { MdStore } from "react-icons/md";
import { FaCrown, FaHeart } from "react-icons/fa";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const BottomNavbar = () => {
  return (
    <div className="bottom-navbar">
      <Link to="/" className="navbot-item">
        <MdStore className="navbot-icon" />
        <span>Stores</span>
      </Link>

      <Link to="/bestsellers" className="navbot-item">
        <FaCrown className="navbot-icon" />
        <span>Bestseller</span>
      </Link>

      <Link to="/Ishum-Exclusive" className="navbot-item">
        <BsFillBookmarkStarFill className="navbot-icon" />
        <span>Ishum Exclusive</span>
      </Link>

      <Link to="/whislist" className="navbot-item">
        <FaHeart className="navbot-icon" />
        <span>Wishlist</span>
      </Link>
    </div>
  );
};

export default BottomNavbar;
