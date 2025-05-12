import React, { useState } from "react";
// import ExclusiveNavigation from '../IshumExclusive/IshumExclusiveBtn';
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
  const [price, setPrice] = useState(0); // For the range input
  const maxPrice = 5000;

  const handleRangeChange = (e) => {
    setPrice(Number(e.target.value));
    setSelected({ ...selected, price: Number(e.target.value) });
  };

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
          <h2 className="bestsellers-title">ISHUM'S EXCLUSIVE</h2>
          <img className="UnderLine" src={UnderLine} alt="" />
        </div>

        <div className="bestsellers-content">
          <div className="bestsellers-filters">
            <h3>Filters</h3>

            <div className="AllPrice-of-bestseller">
              <p className="firstparagraph">Price  <KeyboardArrowRightIcon /></p>
              <input
        type="range"
        min="0"
        max={maxPrice}
        value={price}
        onChange={handleRangeChange}
        className="bestsellers-price-range"
      />
              <div className="two-input-minimax">
              <input type="text" value={`₹ 0`} readOnly />
        <h4>-</h4>
        <input type="text" value={`₹ ${price}`} readOnly />
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
    </>
  );
}










