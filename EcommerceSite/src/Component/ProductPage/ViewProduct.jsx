import React, { useEffect, useState } from "react";
import "../../Style-CSS/ProductPage/ViewProduct.css";
import { useProduct } from "../../ContextApiCart/ProductContextApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ContextApiCart/LoginContextApi";


const ProductPage = () => {
  const { user } = useAuth();
  const { selectedProduct, setSelectedProduct } = useProduct();
  const [selectedSize, setSelectedSize] = useState(36);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(""); // new
  const navigate = useNavigate();


  
  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      setSelectedProduct(JSON.parse(storedProduct));
    }
  }, []); // ✅ empty dependency => run only once on first load

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

  const handleColorSelect = (color) => {
    setSelectedColor(color.colorName);
    setMainImage(color.image);
  };

  const handleAddToCart = async () => {
    if (!user || !user._id) {
      alert("Please log in to add items to your cart.");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:4000/api/cart/addtocart", {
        userId: user._id,
        productId: selectedProduct._id,
        quantity,
        size: selectedSize,
        color: selectedColor || "", // ✅ Use selected color state
      });
  
      console.log("Added to cart:", res.data);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
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
            {colorImages.map((color, idx) => (
              <div className="color-box" key={idx} onClick={() => handleColorSelect(color)}>
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

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;



