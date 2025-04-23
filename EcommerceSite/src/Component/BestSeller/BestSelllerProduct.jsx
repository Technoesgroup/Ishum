import React, { useState, useEffect } from "react";
import { useFilter } from "../../Component/Context-API/Fillter-Context";
import "../../Style-CSS/BestSeller-css/BestSellerProduct.css";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import axios from "axios";
import { colors } from "../BestSeller/ColorSection";
import { useNavigate } from "react-router-dom";

const PRODUCTS_PER_PAGE = 6;

export default function ProductList({ queryParam = "isBestseller=true" }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { selected } = useFilter();
  const navigate = useNavigate();
  const userId = "123456"; // Replace with dynamic user ID

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/products/get-product?${queryParam}`);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [queryParam]);

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const sizeMatch = selected.size ? product.size.includes(selected.size) : true;
        const tagMatch = selected.tag ? product.tag === selected.tag : true;
        const categoryMatch = selected.category ? product.category === selected.category : true;
        const subcategoryMatch = selected.subcategory ? product.subcategory === selected.subcategory : true;
        const colorHex = colors.find((c) => c.name === selected.color)?.hex;
        const colorMatch = selected.color ? product.color === colorHex : true;
        const availableMatch = selected.availability
          ? product.availability === (selected.availability === "InStock")
          : true;
        return sizeMatch && tagMatch && categoryMatch && subcategoryMatch && colorMatch && availableMatch;
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

  // Function to add product to cart
  const handleAddToCart = async (product) => {
    try {
      const res = await axios.post("http://localhost:4000/api/cart/addtocart", {
        userId,
        productId: product._id,
        quantity: 1,
        size: product.size[0], // Default size selection
        color: product.color,  // Selected color
      });
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
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
                <LocalMallIcon className="LocalMallIcon" onClick={() => handleAddToCart(product)} />
                <button className="bestsellers-buy-button" onClick={() => handleAddToCart(product)}>
                  Buy Now
                </button>
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


