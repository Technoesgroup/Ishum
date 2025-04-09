import React, { useState } from "react";
import "../../Style-CSS/BestSeller-css/BestSellerCom1.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import UnderLine from '../../images/Undertextline.png';
import ProductList from './BestSelllerProduct';
import ColorList from './BestSellerColor';
import CategoryList from './BestSellerCategory';
import Banner from './BestSellerBanner';



export default function Bestsellers() {
  const [selected, setSelected] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);

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
    setOpenSortDropdown(false); // Close dropdown after selection
  };

  return (

    <>
    <div className="bestsellers-container">

      <div className="bestseller-MainHeading">
        <h2 className="bestsellers-title">BESTSELLERS OF ISHUM</h2>
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
              {["XS", "S", "M", "L", "XL", "2X"].map((size) => (
                <button key={size} className="bestsellers-size-button">
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
            handleSelection={handleSelection}/>

            {/* Color */}
            <ColorList openDropdown={openDropdown} handleToggle={handleToggle} />
          </div>
        </div>


        <div className="Bestseller-content-product">
          <div className="Allproduct-Boxes">
            <div className="store-bestseller">
              <h3>STORE / BESTSELLERS</h3>
              <h2>73 PRODUCTS</h2>

              <div className="Ishum-bestSeller-search-wrapper">
        <input type="text" placeholder="Search" className="Ishum-bestSeller-search-input" />
        <SearchIcon className="Ishum-bestSeller-search-icon" />
      </div>

            </div>


            <div className="bestseller-boxes">
              <div className="bestseller-boxes-1">
                <button>EXCLUSIVE</button>
                <button className="btn-sort" onClick={handleToggleSortDropdown}>SORT - LOW TO HIGH   <KeyboardArrowRightIcon className="Sort-Right-icon" /></button>
                {openSortDropdown && (
                  <ul className="SortPrice-dropdown">
                    {["100 to 500", "1000 to 2000", "3000", "10000", "50000 to 60000"].map((range) => (
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
              <div className="bestseller-boxes-2">
                <button>CO-ORDSETS</button>
                <button>SUITS</button>
              </div>
              <div className="bestseller-boxes-3">
                <button>ANARKALIS</button>
                <button>DHOTI</button>
              </div>
            </div>

          </div>
   
          {/* product */}
          <ProductList />

        </div>
      </div>
    </div>
          <Banner />
          </>
  );
}
