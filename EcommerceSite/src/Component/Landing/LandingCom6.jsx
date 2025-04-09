import React from "react";
import "../../Style-CSS/Landing-css/LandingCom6.css";
import img_b1 from '../../images/image 27.svg';
import img1 from "../../images/image 10.svg";
import img2 from "../../images/image 10.svg";
import img3 from "../../images/image 10.svg";
import img4 from "../../images/image 10.svg";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const products = [
  {
    name: "VIBRANT VELVET YELLOW CHOGA",
    price: "₹2,900",
    discountPrice: "₹1,900",
    imageUrl: img1,
  },
  {
    name: "ELEGANT BLUE ANARKALI",
    price: "₹3,200",
    discountPrice: "₹2,500",
    imageUrl: img2,
  },
  {
    name: "ROYAL GREEN LEHENGA",
    price: "₹4,500",
    discountPrice: "₹3,800",
    imageUrl: img3,
  },
  {
    name: "CLASSIC BLACK SAREE",
    price: "₹2,700",
    discountPrice: "₹2,200",
    imageUrl: img4,
  },
  {
    name: "CLASSIC BLACK SAREE",
    price: "₹2,700",
    discountPrice: "₹2,200",
    imageUrl: img4,
  },
  {
    name: "CLASSIC BLACK SAREE",
    price: "₹2,700",
    discountPrice: "₹2,200",
    imageUrl: img4,
  },
];


const Collection = () => {
  return (
    <div className="collection-container">
      <h2 className="collection-title">JASHN E RANG COLLECTION</h2>

      <div className="collection-grid">
      {products.map((product, index) => (
  <div key={index} className="product-card">
    <img src={product.imageUrl} alt={product.name} />
    <p className="product-name">{product.name}</p>
 <div className="All-price-with-discount">   <p className="product-price">{product.price}</p>
 <p className="product-discount">{product.discountPrice}</p></div>
  </div>
))}


  
        <div className="Ishum-banner-card">
          <img src={img_b1} alt=""   className="Ishum-bannner-card-img"/>
          <div className="Ishum-banner-content">
          <h2 className="Ishum-banner-title">Jashn-E-Rang</h2>
          <p className="Ishum-banner-text">
            Bringing together the brightest shades of life in one breathtaking collection.
          </p>
          <button className="Ishum-banner-button">Explore</button>
          </div>
          <p  className="Ishum-jashn-paragraph">Jashn-E-Rang brings together the brightest shades of life in one breathtaking collection.<TrendingFlatIcon /></p>
        </div>
      </div>
    </div>
  );
};

export default Collection;
