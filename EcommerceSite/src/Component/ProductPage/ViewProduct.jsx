import React, { useState } from "react";
import "../../Style-CSS/ProductPage/ViewProduct.css";
import { useProduct } from "../../ContextApiCart/ProductContextApi";

const ProductPage = () => {
  const { selectedProduct } = useProduct();
  const [selectedSize, setSelectedSize] = useState(36);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  if (!selectedProduct) {
    return <div>Loading Product...</div>;
  }

  const sizes = selectedProduct.size || [36, 30, 28, 26, 24];
  const thumbnails = selectedProduct.thumbnails?.slice(0, 4) || [];
  const colorImages = selectedProduct.colorImages?.slice(0, 4) || [];

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="product-page">
      <div className="product-gallery">
        <div className="thumbnail-images">
          {thumbnails.map((thumb, idx) => (
            <img
              key={idx}
              src={`http://localhost:4000/uploads/${thumb}`}
              alt={`Thumbnail ${idx}`}
              onClick={() => setMainImage(thumb)}
              className="thumbnail-img"
            />
          ))}
        </div>

        <div className="main-image">
          <img
            src={`http://localhost:4000/uploads/${mainImage || selectedProduct.image}`}
            alt={selectedProduct.name}
          />
        </div>
      </div>

      <div className="product-details">
        <h1 className="product-title">{selectedProduct.name}</h1>

        <div className="price-section">
          <span className="new-price">₹{selectedProduct.price}</span>
          <span className="old-price">₹{selectedProduct.discount}</span>
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
  <div className="color-buttons">
  {selectedProduct.colorImages?.slice(0, 4).map((color, idx) => (
  <div className="color-box" key={idx}>
    <img
      src={`http://localhost:4000/uploads/${color.image}`}
      alt={color.colorName}
      className="color-img"
    />
    <p>{color.colorName}</p>
  </div>
))}

  </div>
</div>


        <div className="quantity-section">
          <button className="quantity-btn" onClick={handleQuantityDecrease}>-</button>
          <div className="quantity-value">{quantity}</div>
          <button className="quantity-btn" onClick={handleQuantityIncrease}>+</button>
        </div>

        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;


