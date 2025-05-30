import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom6.css";

import axios from "axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../ContextApiCart/ProductContextApi"; // ✅ context import
import { useWishlist } from "../ContextHook/WishlistHook";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const collectionName = "NOOR";
  const navigate = useNavigate();
   const { addToWishlist } = useWishlist();
  
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";


  const { setSelectedProduct } = useProduct(); // ✅ context setter

  useEffect(() => {
    const fetchNoorEditProducts = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/products/get-product`, {
          params: {
            isIshumStore: true,
            collectionName: collectionName
          }
        });
        const fetchedProducts = res.data.products || [];
        setProducts(fetchedProducts.slice(0, 8)); // Limit to 6 products
      } catch (error) {
        console.error("Error fetching Noor Edit products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNoorEditProducts();
  }, [collectionName]);

  // ✅ product click handler
// inside Collection component
const handleProductClick = (product) => {

  // slug generate kar rahe hain name/title se
  const slug = product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  // store + navigate
  const updatedProduct = { ...product, slug }; // agar baad me slug chahiye toh object me daal do
  setSelectedProduct(updatedProduct);
  localStorage.setItem("selectedProduct", JSON.stringify(updatedProduct));

  navigate(`/viewproduct/${slug}`);
};



  return (
    <div className="collection-container">
      <div className="ishumCom6-content-MainHeading">
        <h2 className="ishum-content-Com6-title">
          {collectionName} : Elegant velvet suits with rich embroidery
        </h2>

      </div>

      {loading ? (
           <div className="custom-loader-wrapper">
    <div className="custom-spinner"></div>
  </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        <div className="collection-grid">
      {products.map((product, index) => (
  <div
    key={index}
    className="product-card"
    onClick={() => handleProductClick(product)}
    style={{ cursor: "pointer" }}
  >
    <div className="product-img-wrapper">
      <img
      loading="lazy"
        src={`${baseURL}/uploads/${product.image}`}
        alt={product.name}
        onError={(e) => (e.target.src = "/fallback-image.png")}
      />
      <div className="LandingpageComp-hover-icons">
        <FavoriteBorderIcon   onClick={() => addToWishlist(product)}/>
        <VisibilityIcon />
      </div>
    </div>

    <p className="product-name">{product.name}</p>
    <div className="All-price-with-discount">
      <p className="product-discount">₹{product.price}</p>
      <p className="product-price">₹{product.discount}</p>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default Collection;



