import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom4.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../ContextApiCart/ProductContextApi";
import axios from "axios";
import Loader from "../../Pages/LoaderFullpage";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
    const [loading, setLoading] = useState(true);
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";


  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/Viewproduct");
  };

 useEffect(() => {
  const fetchTrendingProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/products/get-product?isBestseller=true`);
      const limited = res.data.products.slice(0, 12);
      setProducts(limited);
      setLoading(false); // ✅ Ye zaroor add kar
    } catch (error) {
      console.error("Failed to fetch trending products:", error);
      setLoading(false); // ❗ Even if there's an error
    }
  };

  fetchTrendingProducts();
}, []);


  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="LandingCom4-trending-section">
      <h2>Trending Best Selling Products</h2>
      <div className="LandingCom4-product-slider">
        {products.map((product) => (
          <div key={product._id} className="LandingCom4-product-card">
            {/* Badge */}
            {product.isExclusive && (
              <span className="LandingCom4-badge best">EXCLUSIVE</span>
            )}
            {product.isBestseller && (
              <span className="LandingCom4-badge best">BEST SELL</span>
            )}

            {/* Image */}
            <div className="LandingCom4-product-img-wrapper">

         {!loadedImages[product._id] && (
    <img
      src="/placeholder.jpg" // apni placeholder image path do
      alt="loading"
      className="placeholder-img"
    />
  )}
  <img
    loading="lazy"
    src={`${baseURL}/uploads/${product.image}`}
    alt={product.name}
    className={`LandingCom4-product-img ${loadedImages[product._id] ? 'loaded' : 'loading'}`}
    onLoad={() =>
      setLoadedImages((prev) => ({
        ...prev,
        [product._id]: true
      }))
    }
              />

              <div className="LandingCom4-hover-icons">
                <FavoriteBorderIcon />
                <VisibilityIcon onClick={() => handleProductClick(product)} />
              </div>
            </div>

            {/* Info */}
            <div className="LandingCom4-product-info">
              <p onClick={() => handleProductClick(product)}>{product.name}</p>
              <p className="LandingCom4-price">
                ₹{product.price}
                <span style={{ textDecoration: "line-through" }}>
                  ₹{product.discount}
                </span>
              </p>

              {product.rating && (
                <p className="LandingCom4-stars">
                  {"★".repeat(Math.floor(product.rating))}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;




















// Ishum Fuchsia Bloom Embroidered Georgette Co-Ord Set
// Ishum Noor Lime Radiance Cotton Muslin Co-Ord Set
//Ishum Noor Ivory Whisper Cotton Muslin Co-Ord Set
// Rangreez Cot-Cotton Co-ord Set with Delicate Lace Detailing









// import React, { useEffect, useState } from "react";
// import "../../Style-CSS/Landing-css/LandingCom4.css";
// import UnderLine from '../../images/Undertextline.png';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useProduct } from "../../ContextApiCart/ProductContextApi";

// const CollectionSection = () => {
//   const [products, setProducts] = useState([]);
//   const baseURL = import.meta.env.VITE_API_BASE_URL;
//   const navigate = useNavigate();
//   const { setSelectedProduct } = useProduct();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${baseURL}/api/products/get-product?tag=Co-OrdSets`);
//         setProducts(res.data.products.slice(0, 4)); // Only 4 products for now
//       } catch (err) {
//         console.error("Error fetching Co-Ord Sets:", err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleViewProduct = (product) => {
//     setSelectedProduct(product);
//     localStorage.setItem("selectedProduct", JSON.stringify(product));
//     navigate("/Viewproduct");
//   };

//   return (
//     <div className="LandingCom-4-collection-container">
//       <div className="ishum-contents-MainHeading">
//         <h2 className="ishum-content-title">DEFINE CO-ORD SETS</h2>
//         <img className="ishum-contents-Com4-UnderLine" src={UnderLine} alt="" />
//       </div>

//       <div className="LandingCom-4-collection-grid">
//         {products.map((product, index) => (
//           <div key={index} className="LandingCom-4-collection-item">
//             <div className="LandingCom-4-image-wrapper">
//               <img
//                 src={`${baseURL}/uploads/${product.image}`}
//                 alt={product.name}
//                 className="LandingCom-4-collection-image"
//               />
//               <div className="LandingCom-4-overlay" />
//             </div>
//             <div className="LandingCom-4-collection-info">
//               <button className="LandingCom-4-view-more" onClick={() => handleViewProduct(product)}>
//                 VIEW PRODUCTS
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <button className="LandingCom-4-view-all-button" onClick={() => navigate("/bestsellers?tag=Co-OrdSets")}>
//         SEE EXCLUSIVES
//       </button>
//     </div>
//   );
// };

// export default CollectionSection;