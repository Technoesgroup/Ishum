import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ProductList from '../BestSeller/BestSelllerProduct';
import ColorList from '../BestSeller/BestSellerColor';
import CategoryList from '../BestSeller/BestSellerCategory';
import { useFilter } from "../../Component/Context-API/Fillter-Context";


export default function Bestsellers() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);
  const { selected, setSelected,  handleSelection} = useFilter();
  const location = useLocation();
  const maxPrice = 50000;

  console.log("Location object:", location);
  const collectionName = location?.state?.collectionName || null;

  console.log("CollectionName in React:", collectionName);

  const handleToggle = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const handleRangeChange = (e) => {
    handleSelection("price", Number(e.target.value)); 
  };

  const handleToggleSortDropdown = () => {
    setOpenSortDropdown(!openSortDropdown);
  };

const handleSelectSortOption = (option) => {
  setSelectedSort(option);
  handleSelection("sortRange", option);  // ✅ Add this line
  setOpenSortDropdown(false);
};


  return (
    <>
      <div className="bestsellers-container">
        

        <div className="bestsellers-content">
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

            <div className="AllSize-of-bestseller">
              <p className="firstparagraph">Size  <KeyboardArrowRightIcon /></p>
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

            {/* Category */}
            <div className="Category-section">
              <CategoryList
                openDropdown={openDropdown}
                handleToggle={handleToggle}
                selected={selected}
                handleSelection={handleSelection}
              />

              {/* Color */}
              <ColorList
                openDropdown={openDropdown}
                handleToggle={handleToggle}
                selected={selected}
                handleSelection={handleSelection}
              />
            </div>
          </div>

          <div className="Bestseller-content-product">
            <div className="Allproduct-Boxes">
             

              <div className="bestseller-boxes">
                
              
              </div>
            </div>

            {/* product */}
            <ProductList queryParam={`ishumstore=true&ishumexclusive=true&isBestseller=true${collectionName ? `&collectionName=${collectionName}` : ""}`} />
          </div>
        </div>
      </div>
      
    </>
  );
}
