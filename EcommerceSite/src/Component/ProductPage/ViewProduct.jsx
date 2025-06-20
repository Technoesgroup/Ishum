import React, { useEffect, useState } from "react";
import "../../Style-CSS/ProductPage/ViewProduct.css";
import { useProduct } from "../../ContextApiCart/ProductContextApi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate ,  useParams } from "react-router-dom";
import { useAuth } from "../../ContextApiCart/LoginContextApi";
import Loader from "../../Pages/LoaderFullpage";
import { useCart } from "../../ContextApiCart/CartContextApi";
import { useModal } from '../ModelContext/ModelContext';


const ProductPage = () => {
    const { slug } = useParams(); 
  const { user } = useAuth();
  const { selectedProduct, setSelectedProduct } = useProduct();
  const [selectedSize, setSelectedSize] = useState(36);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(""); // new
  const [colorThumbnails, setColorThumbnails] = useState([]);
    const {
        showB2BModal, setShowB2BModal,
        showB2UModal, setShowB2UModal,
        showLoginModal, setShowLoginModal,
        showAuthModal, setShowAuthModal
      } = useModal();
   const { fetchCart } = useCart();
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;
 
  useEffect(() => {
    const fetchProductBySlug = async () => {
      try {

        // console.log(`${baseURL}/api/products/slug/${slug}`); 

 const res = await axios.get(`${baseURL}/api/products/slug/${slug}`);


       
        setSelectedProduct(res.data.product);
        setMainImage(res.data.product.image);
      } catch (error) {
        console.error("Failed to fetch product by slug", error);
        toast.error("Product not found!");

      }
    };
    
    if (slug) {
      fetchProductBySlug();
    }
  }, [slug]); // ✅ empty dependency => run only once on first load

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


const handleBuyNow = async () => {
  if (user === undefined) {
    toast.info("Please wait...");
    return;
  }

  if (!user || !user._id) {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setShowAuthModal(true);
    } else {
      setShowB2UModal(true);
    }
    return;
  }

  try {
    await axios.post(`${baseURL}/api/cart/addtocart`, {
      userId: user._id,
      productId: selectedProduct._id,
      quantity,
      size: selectedSize,
      color: selectedColor || "",
    });

    await fetchCart(); // optional: update cart context if needed

    // ✅ Navigate to shipping page after adding to cart
    navigate("/shipping");

  } catch (err) {
    console.error("Error in Buy Now:", err);
    toast.error("Something went wrong!");
  }
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
      const isMobile = window.innerWidth <= 768;
     if (isMobile) {
      setShowAuthModal(true);   // ✅ mobile → open AuthModal
    } else {
      setShowB2UModal(true);    // ✅ desktop → open B2U modal
    }

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
    // console.log("Added to cart:", res.data);
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

        <img  loading="lazy" src={`${baseURL}/uploads/${mainImage || selectedProduct.image}`} alt="product image" />

        </div>

        
      </div>

      <div className="product-details">
        <h1 className="product-title">{selectedProduct.name}</h1>
        <h4  className="product-des"><p>{selectedProduct.description}</p></h4>

        <div className="price-section">
          <span className="new-price">₹{selectedProduct.price}</span>
          {/* <span className="old-price">₹{selectedProduct.discount}</span> */}
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

    <div  className="two-btn-cart-buy">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
         <button className="add-to-cart-btn  buy-now-btn"  onClick={handleBuyNow}>
          Buy Now
        </button>
    </div>
    
      </div>
           <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProductPage;



