import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom6.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useProduct } from "../../ContextApiCart/ProductContextApi";  // context import
import UnderLine from '../../images/Undertextline.png';

const Collection = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const collectionName = "Rangrez";
  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();  // context se setter

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";


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

  const limitedProducts = products.slice(0, 8);

  const handleProductClick = (product) => {
    setSelectedProduct(product);  
    localStorage.setItem("selectedProduct", JSON.stringify(product));  // context me product save
    navigate("/Viewproduct");           // product page pe jao
  };

  return (
    <div className="collection-container">
      <div className="ishumCom6-content-MainHeading">
        <h2 className="ishum-content-Com6-title">{collectionName} Collection</h2>
        <img  loading="lazy" className="ishum-content-UnderLine" src={UnderLine} alt="Underline" />
      </div>

      {loading ? (
       <div className="custom-loader-wrapper">
    <div className="custom-spinner"></div>
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
  <div className="product-img-wrapper">
    <img src={`${baseURL}/uploads/${product.image}`} alt={product.name} />

    <div className="LandingpageComp-hover-icons">
      <FavoriteBorderIcon />
      <VisibilityIcon />
    </div>
  </div>

  <p className="product-name">{product.name}</p>
  <div className="All-price-with-discount">
    <p className="product-discount">₹{product.price}</p>
    <p className="product-price">₹{product.discount}</p>
  </div>
</div>

          ))}

        </div>
      )}
    </div>
  );
};

export default Collection;



