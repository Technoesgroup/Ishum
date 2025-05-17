import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../../Style-CSS/Landing-css/LandingCom4.css";
import axios from "axios";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

   const baseURL = import.meta.env.VITE_API_BASE_URL;


   useEffect(() => {
  axios.get("http://localhost:4000/api/products/get-product")
    .then((res) => {
      const filtered = res.data.products.filter(
        (product) => product.subcategory === "Co-ord sets"
      );

      // ❗ Limit to 12 products only
      const limited = filtered.slice(0, 12);

      // ❗ Move first half to end and second half to start
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
                  <img
                    loading="lazy"
                    src={`http://localhost:4000/uploads/${product.image}`}
                    alt={product.name}
                  />
                  <div className="LandingCom4-hover-icons">
                    <FavoriteBorderIcon />
                    <VisibilityIcon />
                  </div>
                  {/* {!product.availability && (
                    <div className="LandingCom4-out-of-stock">OUT OF STOCK</div>
                  )} */}
                </div>

                <div className="LandingCom4-product-info">
                  <p>{product.name}</p>
                  <p className="LandingCom4-price">
                     ₹{product.price}
                    <span style={{ textDecoration: "line-through" }}>
                          ₹{product.discount}{" "}
                    
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

