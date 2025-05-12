import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom6.css";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../ContextApiCart/ProductContextApi";  // context import
import img_b1 from '../../images/f37e59c3c1941b14378cf406fafeb868fdda4a4e.png';
import UnderLine from '../../images/Undertextline.png';

const Collection = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const collectionName = "Rangrez";
  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();  // context se setter

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchIshumProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/products/get-product`, {
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
        <h2 className="ishum-content-Com6-title">{collectionName} Collection</h2>
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
              <img   src={`${baseURL}/uploads/${product.image}`} alt={product.name} />
              <p className="product-name">{product.name}</p>
              <div className="All-price-with-discount">
                <p className="product-discount">₹{product.price}</p>
                <p className="product-price">₹{product.discount}</p>
              </div>
            </div>
          ))}

          <div className="Ishum-banner-card">
            <img src={img_b1} alt="Banner" className="Ishum-bannner-card-img" />
            <div className="Ishum-banner-content">
              <button className="Ishum-banner-button">Explore</button>
            </div>
            <p className="Ishum-jashn-paragraph">
            Rangrez brings together the brightest shades of life in one breathtaking collection.
              <TrendingFlatIcon />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;



