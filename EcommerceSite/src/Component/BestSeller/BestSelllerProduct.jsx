import React, { useState } from "react";
import '../../Style-CSS/BestSeller-css/BestSellerCom1.css';
import LocalMallIcon from "@mui/icons-material/LocalMall";
import img1 from "../../images/Col-2.svg";
import img2 from "../../images/Col-2.svg";
import img3 from "../../images/Col-2.svg";
import img4 from "../../images/Col-2.svg";
import img5 from "../../images/Col-2.svg";
import img6 from "../../images/Col-2.svg";

const initialProducts = [
  { id: 1, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img1 },
  { id: 2, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img2 },
  { id: 3, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img3 },
  { id: 4, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img4 },
  { id: 5, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img5 },
  { id: 6, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img6 },
  { id: 7, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img1 },
  { id: 8, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img2 },
  { id: 9, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img3 },
  { id: 10, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img4 },
  { id: 11, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img5 },
  { id: 12, name: "VIBRANT VELVET YELLOW CHOGA", price: 1990, originalPrice: 2990, discount: "50% OFF", image: img6 },
];

const PRODUCTS_PER_PAGE = 6;

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(initialProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const displayedProducts = initialProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="bestsellers-products-grid">
        {displayedProducts.map((product) => (
          <div key={product.id} className="bestsellers-product-card">
            <img src={product.image} alt={product.name} className="bestsellers-product-image" />
            <div className="bestsellers-product-details">
              <h3 className="bestsellers-product-name">{product.name}</h3>
              <div className="Original-Discount-Price">
                <p className="bestsellers-product-original-price">₹{product.originalPrice}</p>
                <p className="bestsellers-product-price">₹{product.price}</p>
                <p className="Discount-off">{product.discount}</p>
              </div>
              <div className="LocalMall-Buy-Now-button">
                <LocalMallIcon className="LocalMallIcon" />
                <button className="bestsellers-buy-button">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
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