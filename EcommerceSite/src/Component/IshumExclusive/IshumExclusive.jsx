import React, { useState } from "react";
// import ExclusiveNavigation from '../IshumExclusive/IshumExclusiveBtn';
import "../../Style-CSS/BestSeller-css/BestSellerCom1.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import ProductList from '../../Component/BestSeller/BestSelllerProduct';
import CategoryList from '../BestSeller/BestSellerCategory';
import Banner from '../BestSeller/BestSellerBanner';
import { useFilter } from "../Context-API/Fillter-Context";
import SortFilterBar from "../FillterBarMobile/SortFillterBar";

export default function Bestsellers() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);
  const { selected, setSelected,  handleSelection} = useFilter();
  const maxPrice = 50000;

  const handleRangeChange = (e) => {
    handleSelection("price", Number(e.target.value)); 
  };

  const handleToggle = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
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
        <div className="bestseller-MainHeading">
          <h2 className="bestsellers-title">ISHUM'S EXCLUSIVE</h2>
      
        </div>

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

            {/* Category */}
            <div className="Category-section">
              <CategoryList
                openDropdown={openDropdown}
                handleToggle={handleToggle}
                selected={selected}
                handleSelection={handleSelection}
              />

              {/* Color */}
              {/* <ColorList
                openDropdown={openDropdown}
                handleToggle={handleToggle}
                selected={selected}
                handleSelection={handleSelection}
              /> */}
            </div>
          </div>

          <div className="Bestseller-content-product">
            <div className="Allproduct-Boxes">
              <div className="store-bestseller">
                <h3><a href="/">STORE</a> /  <a href="/bestsellers"> BESTSELLERS</a></h3>
                {/* <h2>59 PRODUCTS</h2> */}
              </div>
              {/* <ExclusiveNavigation showSort={true} /> */}

            </div>

            {/* product */}
            <ProductList queryParam="isExclusive=true" />
          </div>
        </div>
      </div>
      <Banner />
    <div  className="Mobile-SortFilterBar">  <SortFilterBar /></div>
    </>
  );
}










