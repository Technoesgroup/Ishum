import React from 'react';
// import '../styles/sortFilter.css';
import CloseIcon from '@mui/icons-material/Close';

const FilterOverlay = ({ onClose }) => {
  return (
    <div className="MobileView-overlay Mobile-filter-overlay">
      <div className="Mobile-overlay-content">
        <h3>Men's Footwear</h3>
        <ul>
          <li>Men’s Casual Shoes</li>
          <li>Men’s Sports Shoes</li>
          <li>Men’s Sandals & Floaters</li>
          <li>Men’s Slippers & Flip Flops</li>
        </ul>
        <button className="Mobile-apply-btn">Apply</button>
        <button onClick={onClose} className="MobileFillter-close-btn"><CloseIcon /></button>
      </div>
    </div>
  );
};

export default FilterOverlay;
