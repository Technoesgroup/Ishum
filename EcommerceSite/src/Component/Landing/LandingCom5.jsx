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

      const { addToWishlist } = useWishlist();
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";



  const navigate = useNavigate();
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
            {groupedByCategory[categoryName].map((product) => (
              <div key={product._id} className="LandingCom4-product-card">
                <div className="LandingCom4-product-img-wrapper">
                  {!loadedImages[product._id] && (
                    <div className="image-placeholder skeleton-loader"></div>
                  )}

                  <img
                   onClick={() => handleProductClick(product)}
                    // loading="lazy"
                     src={`${baseURL}/uploads/${product.image}`} 
                    alt={product.name}
                    style={{
                      display: loadedImages[product._id] ? "block" : "none"
                    }}
                    onLoad={() =>
                      setLoadedImages((prev) => ({
                        ...prev,
                        [product._id]: true
                      }))
                    }
                  />

                  <div className="LandingCom4-hover-icons">
                    <FavoriteBorderIcon  onClick={() => addToWishlist(product)}/>
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
                      ₹{product.discount}
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


