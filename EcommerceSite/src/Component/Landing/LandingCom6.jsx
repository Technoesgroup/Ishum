import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom6.css";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../ContextApiCart/ProductContextApi";  // context import
import img_b1 from '../../images/image 27.svg';
import UnderLine from '../../images/Undertextline.png';

const Collection = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const collectionName = "Jashn E Rang";
  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();  // context se setter

  useEffect(() => {
    const fetchIshumProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/api/products/get-product`, {
          params: {
            isIshumStore: true,
            collectionName: collectionName,
          }
        });
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching Ishum Store products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchIshumProducts();
  }, [collectionName]);

  const limitedProducts = products.slice(0, 6);

  const handleProductClick = (product) => {
    setSelectedProduct(product);  
    localStorage.setItem("selectedProduct", JSON.stringify(product));  // context me product save
    navigate("/Viewproduct");           // product page pe jao
  };

  return (
    <div className="collection-container">
      <div className="ishumCom6-content-MainHeading">
        <h2 className="ishum-content-Com6-title">{collectionName} COLLECTION</h2>
        <img className="ishum-content-UnderLine" src={UnderLine} alt="Underline" />
      </div>

      {loading ? (
        <div className="loading-indicator">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="collection-grid">
          {limitedProducts.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleProductClick(product)}
              style={{ cursor: "pointer" }}
            >
              <img src={`http://localhost:4000/uploads/${product.image}`} alt={product.name} />
              <p className="product-name">{product.name}</p>
              <div className="All-price-with-discount">
                <p className="product-price">₹{product.price}</p>
                <p className="product-discount">₹{product.discount}</p>
              </div>
            </div>
          ))}

          <div className="Ishum-banner-card">
            <img src={img_b1} alt="Banner" className="Ishum-bannner-card-img" />
            <div className="Ishum-banner-content">
              <button className="Ishum-banner-button">Explore</button>
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
};

export default Collection;



