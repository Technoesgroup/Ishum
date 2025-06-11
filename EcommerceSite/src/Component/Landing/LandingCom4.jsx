import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom4.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../ContextApiCart/ProductContextApi";
import axios from "axios";
import Loader from "../../Pages/LoaderFullpage";
import { useWishlist } from "../ContextHook/WishlistHook";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

  const navigate = useNavigate();
  const {wishlist, toggleWishlist } = useWishlist(); 

  const isInWishlist = (productId) =>
  wishlist?.some((item) => item.productId?._id === productId);

  const { setSelectedProduct } = useProduct();

  const handleProductClick = (product, e) => {
      e.preventDefault();
    const slug = product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const updatedProduct = { ...product, slug };
    setSelectedProduct(updatedProduct);
    localStorage.setItem("selectedProduct", JSON.stringify(updatedProduct));
    navigate(`/viewproduct/${product.slug}`);
  };

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/products/get-product?isBestseller=true`);
        const limited = res.data.products.slice(0, 12);
        setProducts(limited);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch trending products:", error);
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="LandingCom4-trending-section">
      <h2>Trending Best Selling Products</h2>
      <div className="LandingCom4-product-slider">
        {products.map((product ,  index) => { // ✅ check if in wishlist

          return (
            <div key={product._id} className="LandingCom4-product-card">
              {product.isExclusive && (
                <span className="LandingCom4-badge best">EXCLUSIVE</span>
              )}
              {product.isBestseller && (
                <span className="LandingCom4-badge best">BEST SELLER</span>
              )}

              <div className="LandingCom4-product-img-wrapper"  
                onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  >
                {!loadedImages[product._id] && (
                  <img
                    src="/placeholder.jpg"
                    alt="loading"
                    className="placeholder-img"
                  />
                )}
<img
  onClick={(e) => handleProductClick(product, e)}
  loading="lazy"
  src={
    hoveredIndex === index &&
    product.thumbnails &&
    product.thumbnails.length > 1
      ? `${baseURL}/uploads/${
          product.thumbnails[1] ||
          product.thumbnails[2] ||
          product.thumbnails[3] ||
          product.thumbnails[0]
        }`
      : `${baseURL}/uploads/${product.image}`
  }
  alt={product.name}

  onLoad={() =>
    setLoadedImages((prev) => ({
      ...prev,
      [product._id]: true
    }))
  }
  onError={(e) => (e.target.src = "/fallback-image.png")}
/>


          <div className="LandingCom4-hover-icons">
  <FavoriteBorderIcon
  onClick={(e) => {
    e.stopPropagation();
    toggleWishlist(product);
  }}
  style={{
    cursor: "pointer",
    color: isInWishlist(product._id) ? "red" : "black", 
    transition: "color 0.2s ease",
  }}
/>
  <VisibilityIcon onClick={(e) => handleProductClick(product, e)} />
</div>
              </div>

              <div className="LandingCom4-product-info">
                <p>{product.name}</p>
                <p className="LandingCom4-price">
                  ₹{product.price}
                  <span style={{ textDecoration: "line-through" }}>
                    {/* ₹{product.discount} */}
                  </span>
                </p>
                {product.rating && (
                  <p className="LandingCom4-stars">
                    {"★".repeat(Math.floor(product.rating))}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingProducts;




















// Ishum Fuchsia Bloom Embroidered Georgette Co-Ord Set
// Ishum Noor Lime Radiance Cotton Muslin Co-Ord Set
//Ishum Noor Ivory Whisper Cotton Muslin Co-Ord Set
// Rangreez Cot-Cotton Co-ord Set with Delicate Lace Detailing








