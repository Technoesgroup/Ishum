import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom6.css";
import img_b1 from '../../images/image 27.svg';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import UnderLine from '../../images/Undertextline.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Added error state
  const collectionName = "NOOR";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoorEditProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products/get-product", {
          params: {
            isIshumStore: true,
            collectionName: collectionName
          }
        });
        const fetchedProducts = res.data.products || [];
        setProducts(fetchedProducts.slice(0, 6)); // Limit to 6 products
      } catch (error) {
        console.error("Error fetching Noor Edit products:", error);
        setError("Failed to load products. Please try again later.");  // Set error state
      } finally {
        setLoading(false);
      }
    };

    fetchNoorEditProducts();
  }, [collectionName]);

  return (
    <div className="collection-container">
      <div className="ishumCom6-content-MainHeading">
        <h2 className="ishum-content-Com6-title">
          {collectionName} : Elegant velvet suits with rich embroidery
        </h2>
        <img className="ishum-content-UnderLine" src={UnderLine} alt="underline" />
      </div>

      {loading ? (
        <div className="loading-indicator">
          <p>Loading products...</p> {/* You can replace this with a spinner for better UX */}
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p> {/* Display error message */}
        </div>
      ) : (
        <div className="collection-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={`http://localhost:4000/uploads/${product.image}`}
                alt={product.name}
                onError={(e) => (e.target.src = "/fallback-image.png")} 
              />
              <p className="product-name">{product.name}</p>
              <div className="All-price-with-discount">
                <p className="product-price">
                  ₹{product.price - product.discount}
                </p>
                <p className="product-discount">
                  <s>₹{product.price}</s>
                </p>
              </div>
            </div>
          ))}

          <div className="Ishum-banner-card">
            <img src={img_b1} alt="Banner" className="Ishum-bannner-card-img" />
            <div className="Ishum-banner-content">
              <button
                className="Ishum-banner-button"
                onClick={() => navigate("/all-products?collection=Noor Edits")}
              >
                Explore
              </button>
            </div>
            <p className="Ishum-jashn-paragraph">
              Every stitch tells a story, with delicate motifs and embellishments
              creating a perfect blend of tradition and modernity.
              <TrendingFlatIcon className="TrendingFlatIcon" />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;


