import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import '../../Style-CSS/SortFillter.css';

const FilterOverlay = ({ onClose }) => {
  const [activeFilter, setActiveFilter] = useState('Category');
  const [selected, setSelected] = useState({ price: 1000 }); // Default price value
  const maxPrice = 5000;

  const handleRangeChange = (e) => {
    setSelected({ ...selected, price: e.target.value });
  };

  return (
    <div className="SortFillter-filter-overlay">
      {/* Sidebar */}
      <div className="SortFillter-filter-sidebar">
        <ul className="SortFillter-filter-sidebar-list">
          <li 
            className={activeFilter === 'Category' ? "SortFillter-filter-selected" : ""}
            onClick={() => setActiveFilter('Category')}
          >
            Category
          </li>
          <li 
            className={activeFilter === 'SubCategory' ? "SortFillter-filter-selected" : ""}
            onClick={() => setActiveFilter('SubCategory')}
          >
            sub-Category
          </li>
          <li 
            className={activeFilter === 'Price' ? "SortFillter-filter-selected" : ""}
            onClick={() => setActiveFilter('Price')}
          >
            Price
          </li>
          <li>Brand <span className="SortFillter-count">24</span></li>
          <li>Size</li>
          <li>Customer Ratings</li>
          <li>Availability</li>
          <li>Discount <span className="SortFillter-count">1</span></li>
        </ul>
        <div className="SortFillter-products-found">
          <span>12,963 products found</span>
        </div>
      </div>

      {/* Right-side content area */}
      <div className="SortFillter-filter-content">
        <button onClick={onClose} className="SortFillter-close-btn">
          <CloseIcon />
        </button>


        {/* Conditional rendering based on selected filter */}
        {activeFilter === 'Category' && (
          <>
            <h3>Men's Footwear</h3>
            <ul className="SortFillter-subcategory-list">
              <li>Men’s Casual Shoes</li>
              <li>Men’s Sports Shoes</li>
              <li>Men’s Sandals & Floaters</li>
              <li>Men’s Slippers & Flip Flops</li>
            </ul>
          </>
        )}

        {activeFilter === 'SubCategory' && (
          <>
            <h3>Select Sub Category</h3>
            <ul className="SortFillter-subcategory-list">
              <li>Running Shoes</li>
              <li>Training Shoes</li>
              <li>Slip-Ons</li>
              <li>Loafers</li>
            </ul>
          </>
        )}

        {activeFilter === 'Price' && (
          <div className="AllPrice-of-bestseller">
            <p className="firstparagraph">
              Price <KeyboardArrowRightIcon />
            </p>
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={selected.price || 0}
              onChange={handleRangeChange}
              className="bestsellers-price-range"
            />
            <div className="two-input-minimax">
              <input type="text" value={`₹ 0`} readOnly /> <h4>-</h4>
              <input type="text" value={`₹ ${selected.price || 0}`} readOnly />
            </div>
          </div>
        )}

        <button className="SortFillter-apply-btn">Apply</button>
      </div>
    </div>
  );
};

export default FilterOverlay;


