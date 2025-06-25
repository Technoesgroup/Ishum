import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CategoryList from '../BestSellerCategory';
import { useFilter } from '../../Context-API/Fillter-Context'; 

const FilterSection = ({ openDropdown, handleToggle }) => {
  const { selected, handleSelection } = useFilter(); 
   const [selectedSort, setSelectedSort] = useState(null);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const maxPrice = 50000;

  const handleRangeChange = (e) => {
    handleSelection("price", Number(e.target.value)); 
  };

   const handleToggleSortDropdown = () => {
    setOpenSortDropdown(!openSortDropdown);
  };

  const handleSelectSortOption = (option) => {
  setSelectedSort(option);
  handleSelection("sortRange", option);
  setOpenSortDropdown(false);
};

  return (
    <div className="bestsellers-filters">
      <h3>Filters</h3>


          <div className="bestseller-boxes-1  for-all-boxes-btn">
                  <button className="btn-sort" onClick={handleToggleSortDropdown}>
                    SORT - LOW TO HIGH <KeyboardArrowRightIcon className="Sort-Right-icon" />
                  </button>
                  {openSortDropdown && (
                    <ul className="SortPrice-dropdown">
                      {["3000 to 5000", "5000 to 7000", "7000 to 10000", "10000 to 15000"].map((range) => (
                        <li key={range} onClick={() => handleSelectSortOption(range)}>
                          <input
                            type="radio"
                            name="sort"
                            checked={selectedSort === range}
                            onChange={() => handleSelectSortOption(range)}
                          />
                          {range}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

      {/* Price Range */}
      <div className="AllPrice-of-bestseller">
        <p className="firstparagraph">Price <KeyboardArrowRightIcon /></p>
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

      {/* Size */}
      <div className="AllSize-of-bestseller">
        <p className="firstparagraph">Size <KeyboardArrowRightIcon /></p>
        <div className="bestsellers-size-options">
          {["38", "40", "42", "44"].map((size) => (
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
      </div>
    </div>
  );
};

export default FilterSection;

