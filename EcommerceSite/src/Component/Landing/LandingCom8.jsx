import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom6.css";
import img_b1 from '../../images/image 27.svg';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import UnderLine from '../../images/Undertextline.png';
import axios from "axios";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const collectionName = "Unveli Riwayat";

  useEffect(() => {
    const fetchRiwayatProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products/get-product", {
          params: {
            isIshumStore: true,
            collectionName: collectionName
          }
        });
        const fetchedProducts = res.data.products || [];
        setProducts(fetchedProducts.slice(0, 6)); // Show only first 5
      } catch (error) {
        console.error("Error fetching Unveil Riwayat products:", error);
      }
    };

    fetchRiwayatProducts();
  }, []);

  return (
    <div className="collection-container">
      <div className="ishumCom6-content-MainHeading">
        <h2 className="ishum-content-Com6-title">{collectionName}</h2>
        <img className="ishum-content-UnderLine" src={UnderLine} alt="Underline" />
      </div>

      <div className="collection-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
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
    </div>
  );
};

export default Collection;
