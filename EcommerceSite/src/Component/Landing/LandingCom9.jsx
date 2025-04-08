import React from "react";
import "../../Style-CSS/Landing-css/LandingCom9.css";
import img_1 from '../../images/c475e028603ece991446d2c2c67f9682.png';
import img_2 from '../../images/471fb4242b2cec38c1fe410bd07dc7be.png';
import img_3 from '../../images/f0c1099759da99351ed338a416eba652.png';
import img4 from '../../images/Crop-image.png';
import img5 from '../../images/2bb31e35a92274a88a834fcc1e2e496d.png';


const products = [
  {
    id: 1,
    image: img_1, 
    title:
      "Exquisite Cutwork: Delicate Floral And Geometric Patterns Elevate The Ensemble.",
    rating: 4,
  },
  {
    id: 2,
    image: img_2,
    title:
      "Exquisite Cutwork: Delicate Floral And Geometric Patterns Elevate The Ensemble.",
    rating: 4,
  },
  {
    id: 3,
    image: img_3,
    title:
      "Exquisite Cutwork: Delicate Floral And Geometric Patterns Elevate The Ensemble.",
    rating: 4,
  },
];

const NewArrivals = () => {
  return (
    <div className="Com9-new-arrivals-container">
      <h2 className="Com9-section-title">NEW ARRIVALS</h2>
      <div className="Com9-new-arrivals-grid">
        <div className="Com9-image-container">
          <img
            src={img4}
            alt="Main Product"
            className="Com9-main-image"
          />
          <img
            src={img5}
            alt="Close-up Detail"
            className="Com9-detail-image"
          />
        </div>

        {/* Right Side - Product List */}
        <div className="Com9-product-list">
          {products.map((product) => (
            <div key={product.id} className="Com9-product-card">
              <img src={product.image} alt="Product" className="Com9-product-image" />
              <div className="Com9-product-info">
                <p className="Com9-product-title">{product.title}</p>
                <div className="Com9-product-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span  key={i} className={i < product.rating ? "star-filled" : "star-empty"}>
                      ★
                    </span>
                  ))}
                </div>
                <button className="Com9-buy-now-button">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;