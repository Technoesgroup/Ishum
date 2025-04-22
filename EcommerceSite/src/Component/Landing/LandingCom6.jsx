import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom6.css";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import axios from "axios";

import img_b1 from '../../images/image 27.svg';
import UnderLine from '../../images/Undertextline.png';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const collectionName = "Jashn E Rang";  // You can make this dynamic based on user selection

  useEffect(() => {
    const fetchIshumProducts = async () => {
      try {
        // Constructing the query with collectionName and other filters if needed
        const res = await axios.get(`http://localhost:4000/api/products/get-product`, {
          params: {
            isIshumStore: true,
            collectionName: collectionName,
          }
        });
        setProducts(res.data.products); 
      } catch (error) {
        console.error("Error fetching Ishum Store products:", error);
      }
    };

    fetchIshumProducts();
  }, [collectionName]);  // You can change collectionName based on user interaction or context

  // Limit the number of products to 5
  const limitedProducts = products.slice(0, 6);

  return (
    <div className="collection-container">
      <div className="ishumCom6-content-MainHeading">
        <h2 className="ishum-content-Com6-title">{collectionName} COLLECTION</h2>
        <img className="ishum-content-UnderLine" src={UnderLine} alt="Underline" />
      </div>

      <div className="collection-grid">
        {limitedProducts.map((product) => (
          <div key={product._id} className="product-card">
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


