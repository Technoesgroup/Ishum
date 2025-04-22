import React, { useEffect, useState } from "react";
import "../../Style-CSS/Landing-css/LandingCom6.css";
import img_b1 from '../../images/image 27.svg';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import UnderLine from '../../images/Undertextline.png';
import axios from "axios";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const collectionName = "Noor Edits"; 
  useEffect(() => {
    const fetchNoorEditProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products/get-product", {
          params: {
            isIshumStore: true,
            collectionName: collectionName
          }
        });
        const fetchedProducts = res.data.products || [];
        setProducts(fetchedProducts.slice(0, 6)); // Limit to 5
      } catch (error) {
        console.error("Error fetching Noor Edit products:", error);
      }
    };

    fetchNoorEditProducts();
  }, []);

  return (
    <div className="collection-container">
      <div className="ishumCom6-content-MainHeading">
        <h2 className="ishum-content-Com6-title">{collectionName} : Elegant velvet suits with rich embroidery</h2>
        <img className="ishum-content-UnderLine" src={UnderLine} alt="underline" />
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
            Every stitch tells a story, with delicate motifs and embellishments creating a perfect blend of tradition and modernity.
            <TrendingFlatIcon className="TrendingFlatIcon" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Collection;
