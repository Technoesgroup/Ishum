import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../../Style-CSS/Landing-css/LandingCom4.css";
import { useProduct } from "../../ContextApiCart/ProductContextApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../ContextHook/WishlistHook";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

const { wishlist, toggleWishlist } = useWishlist();
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";



  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();

    const isInWishlist = (productId) =>
  wishlist?.some((item) => item.productId?._id === productId);

 const handleProductClick = (product, e) => {
      e.preventDefault();
    const slug = product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const updatedProduct = { ...product, slug };
    setSelectedProduct(updatedProduct);
    localStorage.setItem("selectedProduct", JSON.stringify(updatedProduct));
    navigate(`/viewproduct/${product.slug}`);
  };

  useEffect(() => {
  axios.get(`${baseURL}/api/products/get-product`)
      .then((res) => {
        const filtered = res.data.products.filter(
          (product) => product.subcategory === "Co-ord sets"
        );

        const limited = filtered.slice(0, 12);
        const half = Math.floor(limited.length / 2);
        const rearranged = [...limited.slice(half), ...limited.slice(0, half)];
        setProducts(rearranged);
      })
      .catch((err) => console.error(err));
  }, []);

  const groupedByCategory = groupByCategory(products);

  function groupByCategory(products) {
    const result = {};
    products.forEach((product) => {
      const category = product.category || "Other";
      if (!result[category]) result[category] = [];
      result[category].push(product);
    });
    return result;
  }

  return (
    <div className="LandingCom4-trending-section">
      <h2>All Co-ord sets Products</h2>

      {Object.keys(groupedByCategory).map((categoryName) => (
        <div key={categoryName} className="LandingCom4-category-section">
          <div className="LandingCom4-product-slider">
            {groupedByCategory[categoryName].map((product,  index) => (
              <div key={product._id} className="LandingCom4-product-card">
                <div className="LandingCom4-product-img-wrapper" 
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  >
                  {!loadedImages[product._id] && (
                    <div className="image-placeholder skeleton-loader"></div>
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
                    <VisibilityIcon    onClick={(e) => handleProductClick(product, e)}  />
                  </div>

                  {/* {!product.availability && (
                    <div className="LandingCom4-out-of-stock">OUT OF STOCK</div>
                  )} */}
                </div>

                <div className="LandingCom4-product-info">
                  <p  onClick={(e) => handleProductClick(product, e)} >{product.name}</p>
                  <p className="LandingCom4-price">
                    ₹{product.price}
                    <span style={{ textDecoration: "line-through" }}>
                      {/* ₹{product.discount} */}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingProducts;


