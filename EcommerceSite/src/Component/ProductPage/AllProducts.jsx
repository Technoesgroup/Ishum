import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../../Style-CSS/ProductPage/AllProduct.css";
import { useProduct } from "../../ContextApiCart/ProductContextApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../ContextHook/WishlistHook";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { selectedProduct } = useProduct();
  const { wishlist, toggleWishlist } = useWishlist();
  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
  const navigate = useNavigate();

  const isInWishlist = (productId) =>
    wishlist?.some((item) => item.productId?._id === productId);

  const handleProductClick = (product, e) => {
    e.preventDefault();
    const slug = product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const updatedProduct = { ...product, slug };
    localStorage.setItem("selectedProduct", JSON.stringify(updatedProduct));
    navigate(`/viewproduct/${updatedProduct.slug}`);
  };

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!selectedProduct) return;

    //   console.log("selectedProduct: ", selectedProduct);

      try {
        const res = await axios.get(`${baseURL}/api/products/similar`, {
          params: {
            subcategory: selectedProduct.subcategory,
            name: selectedProduct.name
          }
        });

        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching similar products:", err);
      }
    };

    fetchSimilarProducts();
  }, [selectedProduct]);

  return (
    <div className="SimilarProduct-trending-section">
      <h2>Similar Products</h2>

      <div className="SimilarProduct-product-slider">
        {products.map((product, index) => (
          <div key={product._id} className="SimilarProduct-product-card">
            <div
              className="SimilarProduct-product-img-wrapper"
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

              <div className="SimilarProduct-hover-icons">
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

            <div className="SimilarProduct-product-info">
              <p onClick={(e) => handleProductClick(product, e)}>{product.name}</p>
              <p className="SimilarProduct-price">
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
  );
};

export default TrendingProducts;
