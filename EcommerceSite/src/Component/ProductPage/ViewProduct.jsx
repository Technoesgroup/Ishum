import React, { useState } from "react";
import "./ProductPage.css";
import ProductImg from '../../images/Col-3.svg'
import Thumbnailimg1 from  '../../images/Col-3.svg';
import Thumbnailimg2 from '../../images/Col-3.svg'
import Thumbnailimg3 from '../../images/Col-3.svg'
import Thumbnailimg4 from '../../images/Col-3.svg'
import Thumbnailimg5 from '../../images/Col-3.svg'
import Color1 from '../../images/Col-3.svg'
import Color2 from '../../images/Col-3.svg'
import Color3 from '../../images/Col-3.svg'

const thumbnails = [
  Thumbnailimg1,
  Thumbnailimg2,
  Thumbnailimg3,
  Thumbnailimg4,
  Thumbnailimg5,
];

const colors = [
  { colorName: "WHITE", img: Color1},
  { colorName: "PINK", img: Color2 },
  { colorName: "PINK", img: Color3 },
];

const sizes = [36, 30, 28, 26, 24];

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState(36);
  const [quantity, setQuantity] = useState(1);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="product-page">
      <div className="product-gallery">
        <div className="thumbnail-list">
          {thumbnails.map((thumb, idx) => (
            <img key={idx} src={thumb} alt={`Thumbnail ${idx}`} className="thumbnail-img" />
          ))}
        </div>
        <div className="main-image">
          <img src={ProductImg} alt="Main Product" />
        </div>
      </div>

      <div className="product-details">
        <h1>Riwayat - Luxurious Red Viscose Crepe Suit in Multicolor</h1>
        <div className="price-section">
          <span className="new-price">Rs. 11,199.00</span>
          <span className="old-price">Rs. 15,199.00</span>
        </div>

        <p className="tax-info">Tax included. Shipping calculated at checkout.</p>

        <div className="size-section">
          <h4>Select Size</h4>
          <div className="size-buttons">
            {sizes.map((size) => (
              <button
                key={size}
                className={selectedSize === size ? "size-btn active" : "size-btn"}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="color-section">
          <h4>Color</h4>
          <div className="color-options">
            {colors.map((color, idx) => (
              <div className="color-box" key={idx}>
                <img src={color.img} alt={color.colorName} />
                <p>{color.colorName}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;
