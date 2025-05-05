// src/Component/BestSeller/ExclusiveNavigation.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function BestSellerNavigation({ showSort = true }) {
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleToggleSortDropdown = () => {
    setOpenSortDropdown(!openSortDropdown);
  };

  const handleSelectSortOption = (option) => {
    setSelectedSort(option);
    setOpenSortDropdown(false);
  };

  return (
    <div className="bestseller-boxes">
      <div className="bestseller-boxes-1 for-all-boxes-btn">
        <button  onClick={() => handleNavigate("/Ishum-Exclusive")}>EXCLUSIVE</button>
        {showSort && (
          <button className="btn-sort" onClick={handleToggleSortDropdown}>
            SORT - LOW TO HIGH <KeyboardArrowRightIcon className="Sort-Right-icon" />
          </button>
        )}
        {openSortDropdown && (
          <ul className="SortPrice-dropdown">
            {["1000 to 2000", "3000", "10000", "50000 to 60000"].map((range) => (
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
      <div className="bestseller-boxes-2 for-all-boxes-btn">
        <button onClick={() => handleNavigate("/bestsellers-CO-ORDSETS")}>CO-ORDSETS</button>
        <button onClick={() => handleNavigate("/bestsellers-SUITS")}>SUITS</button>
      </div>
      <div className="bestseller-boxes-3 for-all-boxes-btn">
        <button onClick={() => handleNavigate("/bestsellers-ANARKALIS")}>ANARKALIS</button>
        <button onClick={() => handleNavigate("/bestsellers-DHOTI")}>DHOTI</button>
      </div>
    </div>
  );
}
