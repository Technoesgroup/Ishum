import React from "react";
import "../../Style-CSS/Landing-css/LandingCom9.css";
import img_1 from '../../images/1746684364723-238174622.jpg';
import img_2 from '../../images/1746685994043-507831531.jpg';
import img_3 from '../../images/1746608536944-880351628.jpg';
import img4 from '../../images/1746615607071-494434453.jpg';
import img5 from '../../images/2bb31e35a92274a88a834fcc1e2e496d.png';

const products = [
  {
    id: 1,
    image: img_1, 
    title: "NOOR Collection: Graceful chikankari in pastel hues, perfect for festive elegance.",
    rating: 4,
    link: "/viewproduct/noor-noir-embroidered-straight-suit-in-cotton-muslin"
  },
  {
    id: 2,
    image: img_2,
    title: "NOOR Edition: Elegant embroidery with modern silhouettes for a timeless look.",
    rating: 4,
    link: "/viewproduct/noorani-heritage-a-line-suit-set-in-cotton-muslin"
  },
  {
    id: 3,
    image: img_3,
    title: "Sawariya Style: Vibrant hues & intricate detailing that capture true ethnic charm.",
    rating: 4,
    link: "/viewproduct/floral-and-motif-printed-cotton-muslin-co-ord-set"
  },
];



const NewArrivals = () => {
  return (
    <div className="Com9-new-arrivals-container">
      <h2 className="Com9-section-title">NEW ARRIVALS</h2>
      <div className="Com9-new-arrivals-grid">
        <div className="Com9-image-container">
          <img
            loading="lazy"
            src={img4}
            alt="Main Product"
            className="Com9-main-image"
          />
          <img
            loading="lazy"
            src={img5}
            alt="Close-up Detail"
            className="Com9-detail-image"
          />
        </div>

        {/* Right Side - Product List */}
        <div className="Com9-product-list">
          {products.map((product) => (
           <div key={product.id} className="Com9-product-card">
  <img loading="lazy" src={product.image} alt="Product" className="Com9-product-image" />
  <div className="Com9-product-info">
    <p className="Com9-product-title">{product.title}</p>
    <div className="Com9-product-rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < product.rating ? "star-filled" : "star-empty"}>
          ★
        </span>
      ))}
    </div>
    <a href={product.link} className="Com9-buy-now-button" target="_blank" rel="noopener noreferrer">
      Buy Now
    </a>
  </div>
</div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;