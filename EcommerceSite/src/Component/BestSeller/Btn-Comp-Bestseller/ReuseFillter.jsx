// src/Component/Common/FilterSection.jsx

import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CategoryList from '../BestSellerCategory';
import ColorList from '../BestSellerColor';

const FilterSection = ({ selected, handleSelection, openDropdown, handleToggle }) => {
  return (
    <div className="bestsellers-filters">
      <h3>Filters</h3>

      {/* Price Range */}
      <div className="AllPrice-of-bestseller">
        <p className="firstparagraph">Price <KeyboardArrowRightIcon /></p>
        <input type="range" min="0" max="5000" className="bestsellers-price-range" />
        <div className="two-input-minimax">
          <input type="text" placeholder="₹ 0" /> <h4>-</h4>
          <input type="text" placeholder="₹ 500" />
        </div>
      </div>

      {/* Size */}
      <div className="AllSize-of-bestseller">
        <p className="firstparagraph">Size <KeyboardArrowRightIcon /></p>
        <div className="bestsellers-size-options">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={`bestsellers-size-button ${selected.size === size ? "active" : ""}`}
              onClick={() => handleSelection("size", size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Category and Color */}
      <div className="Category-section">
        <CategoryList
          openDropdown={openDropdown}
          handleToggle={handleToggle}
          selected={selected}
          handleSelection={handleSelection}
        />
        <ColorList
          openDropdown={openDropdown}
          handleToggle={handleToggle}
          selected={selected}
          handleSelection={handleSelection}
        />
      </div>
    </div>
  );
};

export default FilterSection;
