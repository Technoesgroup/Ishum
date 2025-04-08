import React from "react";
import "../../../Style-CSS/Landing-css/SearchMobileView/SearchMobile.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Fillter from '../../../images/settings-sliders.png';
import Img1 from '../../../images/Col-2.svg'
import Img2 from '../../../images/Col-3.svg'
import Img3 from '../../../images/Col-4.svg'

const MobileView = () => {
  return (
    <div className="Ishum-mobile-container">
      {/* Search Bar */}
      <div className="Ishum-mobile-search-wrapper">
        <input type="text" placeholder="Search" className="Ishum-mobile-search-input" />
        <SearchIcon className="Ishum-mobile-search-icon" />
        <button className="Ishum-mobile-filter-btn">
        <div className="Ishum-mobile-Search-icon-div"> <img src={Fillter} alt=""   className="Ishum-mobile-Search-icon" /></div>
        </button>
      </div>

      {/* Recent Searches */}
      <div className="Ishum-mobile-recent-searches">
        <div className="Ishum-mobile-recent-header">
          <p>Recent Searches</p>
          <DeleteIcon className="Ishum-mobile-icon-small" />
        </div>
        <div className="Ishum-mobile-tags">
          {['Suits', 'Dhoti', 'Gulzaar'].map((term) => (
            <div key={term} className="Ishum-mobile-tag">
              {term}
              <CloseIcon className="Ishum-mobile-icon-x" />
            </div>
          ))}
        </div>
      </div>

      {/* Popular this week */}
      <h2 className="Ishum-mobile-popular-heading">Popular this week</h2>
      <div className="Ishum-mobile-popular-scroll">
        {[
          {
            title: "Anarkalis",
            price: "@2999",
            img:Img1,
          },
          {
            title: "Co-ord sets",
            price: "@2999",
            img: Img2,
          },
          {
            title: "Suits",
            price: "@2999",
            img:Img3,
          },
        ].map((item) => (
          <div key={item.title} className="Ishum-mobile-popular-card">
            <img src={item.img} alt={item.title} className="Ishum-mobile-popular-img" />
            <div className="Ishum-mobile-popular-info">
              <p>{item.title}</p>
              <p className="Ishum-mobile-text-muted">starting {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileView;
