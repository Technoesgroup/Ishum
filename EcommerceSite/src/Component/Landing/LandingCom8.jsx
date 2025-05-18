import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom6.css";
import img_b1 from '../../images/image27.svg';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../ContextApiCart/ProductContextApi"; // ✅ context import

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const collectionName = "Unveli Riwayat";
  const navigate = useNavigate();

  const { setSelectedProduct } = useProduct(); // ✅ context setter

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";


  useEffect(() => {
    const fetchRiwayatProducts = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/products/get-product`, {
          params: {
            isIshumStore: true,
            collectionName: collectionName
          }
        });
        const fetchedProducts = res.data.products || [];
        setProducts(fetchedProducts.slice(0, 6)); // Limit to 6 products
      } catch (error) {
        console.error("Error fetching Unveil Riwayat products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayatProducts();
  }, [collectionName]);

  // ✅ product click handler
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/Viewproduct");
  };

  // ⬇ After useEffect and handlers

// ✅ Skip rendering if products are empty and not loading
if (!loading && products.length === 0) return null;

return (
  <div className="collection-container">
    <div className="ishumCom6-content-MainHeading">
      <h2 className="ishum-content-Com6-title">{collectionName}</h2>
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
            <img
            loading="lazy"
              src={`${baseURL}/uploads/${product.image}`}
              alt={product.name}
              onError={(e) => (e.target.src = "/fallback-image.png")}
            />
            <p className="product-name">{product.name}</p>
            <div className="All-price-with-discount">
              <p className="product-price">₹{product.price - product.discount}</p>
              <p className="product-discount"><s>₹{product.price}</s></p>
            </div>
          </div>
        ))}

        <div className="Ishum-banner-card">
          <img src={img_b1} alt="Banner" className="Ishum-bannner-card-img" />
          <div className="Ishum-banner-content">
            <button
              className="Ishum-banner-button"
              onClick={() => navigate("/all-products?collection=Unveli Riwayat")}
            >
              Explore
            </button>
          </div>
          <p className="Ishum-jashn-paragraph">
            Jashn-E-Rang brings together the brightest shades of life in one breathtaking collection.
            <TrendingFlatIcon />
          </p>
        </div>
      </div>
    )}
  </div>
);
}

export default Collection;
