import React, { useEffect, useState } from "react";
import "../../Style-CSS/ProductPage/ViewProduct.css";
import { useProduct } from "../../ContextApiCart/ProductContextApi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ContextApiCart/LoginContextApi";
import Loader from "../../Pages/LoaderFullpage";
import { useCart } from "../../ContextApiCart/CartContextApi";
import { useParams } from "react-router-dom";
import Register from '../../Component/B-TO-C-Login/RegisterUser';


const ProductPage = () => {
  const { user } = useAuth();
   const { slug } = useParams();
  const { selectedProduct, setSelectedProduct } = useProduct();
  const [selectedSize, setSelectedSize] = useState(36);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(""); // new
  const [colorThumbnails, setColorThumbnails] = useState([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
   const { fetchCart } = useCart();

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      setSelectedProduct(JSON.parse(storedProduct));
    }
  }, []); // ✅ empty dependency => run only once on first load

 if (!selectedProduct) {
  return <Loader />;
}


  const sizes = selectedProduct.size || [36, 30, 28, 26, 24];
  const thumbnails = selectedProduct.thumbnails?.slice(0, 4) || [];


  // Step: Extract unique colorName and take the first image of each
const uniqueColorImages = [];

const seenColors = new Set();

for (let colorObj of selectedProduct.colorImages) {
  if (!seenColors.has(colorObj.colorName)) {
    seenColors.add(colorObj.colorName);
    uniqueColorImages.push(colorObj);
  }
}

// Then use this in render
const colorImages = uniqueColorImages.slice(0, 4); // Optional: limit to 4 unique colors

  

const handleColorSelect = (colorName, images) => {
  setSelectedColor(colorName);
  setMainImage(images[0]);
  setColorThumbnails(images.slice(1));
};



const groupColorImages = (colorImages) => {
  const grouped = {};

  colorImages.forEach((item) => {
    if (!grouped[item.colorName]) {
      grouped[item.colorName] = [];
    }
    grouped[item.colorName].push(item.image);
  });

  return grouped;
};

// example use
const groupedColorImages = groupColorImages(selectedProduct.colorImages);




  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };


const handleAddToCart = async () => {
  if (user === undefined) {
    toast.info("Please wait..."); // user is still loading
    return;
  }

  if (!user || !user._id) {
    setShowRegisterModal(true);
    return;
  }

  toast.info("Product added to cart!");

  try {
    const res = await axios.post(`${baseURL}/api/cart/addtocart`, {
      userId: user._id,
      productId: selectedProduct._id,
      quantity,
      size: selectedSize,
      color: selectedColor || "",
    });
      await fetchCart();
    console.log("Added to cart:", res.data);
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};


  
  

  return (
    <div className="product-page">
      <div className="product-gallery">
      <div className="thumbnail-images">
  {(colorThumbnails.length > 0 ? colorThumbnails : thumbnails).map((img, idx) => (
    <img
    loading="lazy"
      key={idx}
      src={`${baseURL}/uploads/${img}`}
      alt={`Thumbnail ${idx}`}
      onClick={() => setMainImage(img)}
      className="thumbnail-img"
    />
  ))}
</div>

        <div className="main-image">

        <img    loading="lazy" src={`${baseURL}/uploads/${mainImage || selectedProduct.image}`} alt="product image" />

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
    {Object.entries(groupedColorImages).map(([colorName, images], idx) => (
      <div
        className="color-box"
        key={idx}
        onClick={() => handleColorSelect(colorName, images)}
      >
        <img
           loading="lazy"
          src={`${baseURL}/uploads/${images[0]}`}
          alt={colorName}
          className="color-img"
        />
        <p>{colorName}</p>
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
           <ToastContainer position="top-right" autoClose={3000} />

           
           {showRegisterModal && (
      <div className="mainpage-modal-overlay">
        <div className="mainpage-modal-content">
          <button className="mainpage-close-btn" onClick={() => setShowRegisterModal(false)}>X</button>
          <Register />
        </div>
      </div>
    )}
    </div>
  );
};

export default ProductPage;



