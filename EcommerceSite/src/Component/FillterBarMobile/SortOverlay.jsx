import React from 'react';
// import '../styles/sortFilter.css';
import CloseIcon from '@mui/icons-material/Close';

const SortOverlay = ({ onClose }) => {
  return (
    <div className="MobileView-overlay Mobile-sort-overlay">
      <div className="Mobile-sort-content">
        <h3>Sort by</h3>
        <ul>
          <li className="Mobile-active">Popularity</li>
          <li>Price Low To High</li>
          <li>Price High To Low</li>
          <li>New Arrivals</li>
          <li>Bestseller</li>
          <li>Discount High to Low</li>
          <li>Fastest Shipping Time</li>
        </ul>
        <button onClick={onClose} className="MobileFillter-close-btn"><CloseIcon /></button>
      </div>
    </div>
  );
};

export default SortOverlay;
