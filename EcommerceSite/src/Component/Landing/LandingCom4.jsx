import React from "react";
import "../../Style-CSS/Landing-css/LandingCom4.css";
import img1 from '../../images/Col-3.svg'
import img2 from '../../images/Col-4.svg'
import img3 from '../../images/Col-2.svg'
import img4 from '../../images/Col-1.svg'

const collections = [
  { title: "Floral Top With tulip Pants", image:img1 },
  { title: "Floral Top With tulip Pants", image:img2},
  { title: "Floral Top With tulip Pants", image:img3},
  { title: "Floral Top With tulip", image:img4}
];

const CollectionSection = () => {
  return (
    <div className="LandingCom-4-collection-container">
      <h2 className="LandingCom-4-collection-title">DEFINE CO-ORD SETS</h2>
      <div className="LandingCom-4-dots-container">
        <span className="LandingCom-4-dot active"></span>
        <span className="LandingCom-4-dot"></span>
        <span className="LandingCom-4-dot"></span>
      </div>
      <div className="LandingCom-4-collection-grid">
        {collections.map((col, index) => (
          <div key={index} className="LandingCom-4-collection-item">
            <img src={col.image} alt={col.title} className="LandingCom-4-collection-image" />
            <div className="LandingCom-4-collection-info">
            <span>  <p className="LandingCom-4-collection-name">{col.title}</p></span>
             <span> <button className="LandingCom-4-view-more">VIEW PRODUCTS</button></span>
            </div>
          </div>
        ))}
      </div>
      <button className="LandingCom-3-view-all-button">SEE EXCLUSIVES</button>
    </div>
  );
};

export default CollectionSection;