// src/Component/BestSeller/ExclusiveNavigation.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ExclusiveNavigation({ showSort = true }) {
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
        <button  onClick={() => handleNavigate("/Ishum-Exclusive")}>JASHN E RANG</button>
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
        <button onClick={() => handleNavigate("/Ishum-Exclusive-Gulzar")}>GULZAAR</button>
        <button onClick={() => handleNavigate("/Ishum-Exclusive-Rangrez")}>RANGREZ</button>
      </div>
      <div className="bestseller-boxes-3 for-all-boxes-btn">
        <button onClick={() => handleNavigate("/Ishum-Exclusive-Unveil-Riwayat")}>UNVEIL RIWAYAT</button>
        <button onClick={() => handleNavigate("/Ishum-Exclusive-Noor-Edits")}>NOOR EDITS</button>
      </div>
    </div>
  );
}
