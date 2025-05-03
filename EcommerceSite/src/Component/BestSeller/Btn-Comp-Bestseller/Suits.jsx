import React, { useState } from "react";
import Sellerfillterbtn from './Btn-Comp-Best'
import "../../../Style-CSS/BestSeller-css/BestSellerCom1.css";
import FilterSection from '../../BestSeller/Btn-Comp-Bestseller/ReuseFillter';
import UnderLine from '../../../images/Undertextline.png';
import ProductList from '../../../Component/BestSeller/BestSelllerProduct';
import Banner from '../BestSellerBanner';
import { useFilter } from "../../Context-API/Fillter-Context";

export default function Bestsellers() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { selected, setSelected } = useFilter();

  const handleToggle = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const handleSelection = (section, value) => {
    setSelected({ ...selected, [section]: value });
  };

  return (
    <>
      <div className="bestsellers-container">
        <div className="bestseller-MainHeading">
          <h2 className="bestsellers-title">NOOR EDITS</h2>
          <img className="UnderLine" src={UnderLine} alt="" />
        </div>

        <div className="bestsellers-content">
        <FilterSection
            selected={selected}
            handleSelection={handleSelection}
            openDropdown={openDropdown}
            handleToggle={handleToggle}
          />

          <div className="Bestseller-content-product">
            <div className="Allproduct-Boxes">
              <div className="store-bestseller">
                <h3>STORE / BESTSELLERS</h3>
                <h2>59 PRODUCTS</h2>
              </div>
              <Sellerfillterbtn showSort={true} />
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