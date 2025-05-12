import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom4.css";
import UnderLine from '../../images/Undertextline.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../ContextApiCart/ProductContextApi";

const CollectionSection = () => {
  const [products, setProducts] = useState([]);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/products/get-product?tag=Co-OrdSets`);
        setProducts(res.data.products.slice(0, 4)); // Only 4 products for now
      } catch (err) {
        console.error("Error fetching Co-Ord Sets:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/Viewproduct");
  };

  return (
    <div className="LandingCom-4-collection-container">
      <div className="ishum-contents-MainHeading">
        <h2 className="ishum-content-title">DEFINE CO-ORD SETS</h2>
        <img className="ishum-contents-Com4-UnderLine" src={UnderLine} alt="" />
      </div>

      <div className="LandingCom-4-collection-grid">
        {products.map((product, index) => (
          <div key={index} className="LandingCom-4-collection-item">
            <div className="LandingCom-4-image-wrapper">
              <img
                src={`${baseURL}/uploads/${product.image}`}
                alt={product.name}
                className="LandingCom-4-collection-image"
              />
              <div className="LandingCom-4-overlay" />
            </div>
            <div className="LandingCom-4-collection-info">
              <button className="LandingCom-4-view-more" onClick={() => handleViewProduct(product)}>
                VIEW PRODUCTS
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="LandingCom-4-view-all-button" onClick={() => navigate("/bestsellers?tag=Co-OrdSets")}>
        SEE EXCLUSIVES
      </button>
    </div>
  );
};

export default CollectionSection;




















// Ishum Fuchsia Bloom Embroidered Georgette Co-Ord Set
// Ishum Noor Lime Radiance Cotton Muslin Co-Ord Set
//Ishum Noor Ivory Whisper Cotton Muslin Co-Ord Set
// Rangreez Cot-Cotton Co-ord Set with Delicate Lace Detailing