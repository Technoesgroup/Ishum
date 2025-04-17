import React, { useState, useEffect } from "react";
import { useFilter } from "../../Component/Context-API/Fillter-Context";
import "../../Style-CSS/BestSeller-css/BestSellerCom1.css";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import axios from "axios";
import {colors} from "../BestSeller/ColorSection"

const PRODUCTS_PER_PAGE = 6;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { selected } = useFilter();

  useEffect(() => {

    console.log("Current selected filters:", selected);
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products/get-product");
        setProducts(res.data.products); // ✅ fix applied here

        console.log("Filtered Products:", filteredProducts);
        console.log("Displayed Products:", displayedProducts);

      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);
  

  // Apply filters
  const filteredProducts = Array.isArray(products)
  ? products.filter((product) => {
      const sizeMatch = selected.size ? product.size.includes(selected.size) : true;
      const tagMatch = selected.tag ? product.tag === selected.tag : true;
      const categoryMatch = selected.category ? product.category === selected.category : true;
      const subcategoryMatch = selected.subcategory ? product.subcategory === selected.subcategory : true;
      const colorHex = colors.find((c) => c.name === selected.color)?.hex;
      console.log("Selected color name:", selected.color);
      console.log("Expected hex:", colorHex);
      console.log("Product color:", product.color);
      
      const colorMatch = selected.color
        ? product.color === colorHex
        : true;
      
    
      const availableMatch = selected.availability
      ? product.availability === (selected.availability === "InStock")
      : true;

      const matchResult = sizeMatch && tagMatch && categoryMatch && subcategoryMatch && colorMatch && availableMatch;
      console.log("Match result:", matchResult, product);
      return matchResult;
    })
  : [];




  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="bestsellers-products-grid">
        {displayedProducts.map((product) => (
          <div key={product._id} className="bestsellers-product-card">
            <img
              src={`http://localhost:4000/uploads/${product.image}`}
              alt={product.name}
              className="bestsellers-product-image"
            />
            <div className="bestsellers-product-details">
              <h3 className="bestsellers-product-name">{product.name}</h3>
              <div className="Original-Discount-Price">
                <p className="bestsellers-product-original-price">₹{product.discount}</p>
                <p className="bestsellers-product-price">₹{product.price}</p>
              </div>
              <div className="LocalMall-Buy-Now-button">
                <LocalMallIcon className="LocalMallIcon" />
                <button className="bestsellers-buy-button">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
