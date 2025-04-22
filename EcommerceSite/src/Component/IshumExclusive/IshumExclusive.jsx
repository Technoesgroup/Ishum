import React, { useState } from "react";
import "../../Style-CSS/BestSeller-css/BestSellerCom1.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import UnderLine from '../../images/Undertextline.png';
import ProductList from '../../Component/BestSeller/BestSelllerProduct';
import ColorList from '../BestSeller/BestSellerColor';
import CategoryList from '../BestSeller/BestSellerCategory';
import Banner from '../BestSeller/BestSellerBanner';
import { useFilter } from "../Context-API/Fillter-Context";

export default function Bestsellers() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);
  const { selected, setSelected } = useFilter();

  const handleToggle = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const handleSelection = (section, value) => {
    setSelected({ ...selected, [section]: value });
  };

  const handleToggleSortDropdown = () => {
    setOpenSortDropdown(!openSortDropdown);
  };

  const handleSelectSortOption = (option) => {
    setSelectedSort(option);
    // optional: setSelected({ ...selected, sort: option }); // if sorting is used in backend
    setOpenSortDropdown(false);
  };

  return (
    <>
      <div className="bestsellers-container">
        <div className="bestseller-MainHeading">
          <h2 className="bestsellers-title">JASH-E-RANG COLLECTION</h2>
          <img className="UnderLine" src={UnderLine} alt="" />
        </div>

        <div className="bestsellers-content">
          <div className="bestsellers-filters">
            <h3>Filters</h3>

            <div className="AllPrice-of-bestseller">
              <p className="firstparagraph">Price  <KeyboardArrowRightIcon /></p>
              <input type="range" min="0" max="5000" className="bestsellers-price-range" />
              <div className="two-input-minimax">
                <input type="text" placeholder="₹ 0" /> <h4>-</h4>
                <input type="text" placeholder="₹ 500" />
              </div>
            </div>

            <div className="AllSize-of-bestseller">
              <p className="firstparagraph">Size  <KeyboardArrowRightIcon /></p>
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
              <div className="store-bestseller">
                <h3>STORE / BESTSELLERS</h3>
                <h2>59 PRODUCTS</h2>
              </div>

              <div className="bestseller-boxes">
                <div className="bestseller-boxes-1  for-all-boxes-btn">
                  <button onClick={() => handleSelection("tag", "Exclusive")}>JASHN E RANG</button>
                  <button className="btn-sort" onClick={handleToggleSortDropdown}>
                    SORT - LOW TO HIGH <KeyboardArrowRightIcon className="Sort-Right-icon" />
                  </button>
                  {openSortDropdown && (
                    <ul className="SortPrice-dropdown">
                      {[ "1000 to 2000", "3000", "10000", "50000 to 60000"].map((range) => (
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
                <div className="bestseller-boxes-2  for-all-boxes-btn">
                  <button onClick={() => handleSelection("tag", "Co-OrdSets")}>GULZAAR</button>
                  <button onClick={() => handleSelection("tag", "Suits")}>RANGREZ</button>
                </div>
                <div className="bestseller-boxes-3 for-all-boxes-btn">
                  <button onClick={() => handleSelection("tag", "Anarkali")}>UNVEIL RIWAYAT</button>
                  <button onClick={() => handleSelection("tag", "Dhoti")}>NOOR EDITS</button>
                </div>
              </div>
            </div>

            {/* product */}
            <ProductList queryParam="isExclusive=true" />
          </div>
        </div>
      </div>
      <Banner />
    </>
  );
}










