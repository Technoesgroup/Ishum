// src/Component/Common/FilterSection.jsx

import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CategoryList from '../BestSellerCategory';
import ColorList from '../BestSellerColor';

const FilterSection = ({ selected, handleSelection, openDropdown, handleToggle }) => {

  const [price, setPrice] = useState(0); // For the range input
  const maxPrice = 5000;

  const handleRangeChange = (e) => {
    setPrice(Number(e.target.value));
  };


  return (
    <div className="bestsellers-filters">
      <h3>Filters</h3>

      {/* Price Range */}
      <div className="AllPrice-of-bestseller">
        <p className="firstparagraph">Price <KeyboardArrowRightIcon /></p>
        <input
        type="range"
        min="0"
        max={maxPrice}
        value={price}
        onChange={handleRangeChange}
        className="bestsellers-price-range"
      />
        <div className="two-input-minimax">
        <input type="text" value={`₹ 0`} readOnly /> <h4>-</h4>
        <input type="text" value={`₹ ${price}`} readOnly />
        </div>
      </div>

      {/* Size */}
      <div className="AllSize-of-bestseller">
        <p className="firstparagraph">Size <KeyboardArrowRightIcon /></p>
        <div className="bestsellers-size-options">
          {["38", "40", "42", "44",].map((size) => (
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
        {/* <ColorList
          openDropdown={openDropdown}
          handleToggle={handleToggle}
          selected={selected}
          handleSelection={handleSelection}
        /> */}
      </div>
    </div>
  );
};

export default FilterSection;
