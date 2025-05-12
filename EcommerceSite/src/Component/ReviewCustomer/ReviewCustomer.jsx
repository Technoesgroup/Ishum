import React, { useState } from "react";
import "../ReviewCustomer/ReviewCustomer.css";
import img1 from '../../images/2bb31e35a92274a88a834fcc1e2e496d.png';
import img2 from '../../images/b7c0458edce18027db5028842fd3cc17.png';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import img3 from '../../images/Undertextline.png';
import vectorimg from '../../images/Vector.png';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const reviews = [
  { id: 1, name: "Tanushri M.", image: img2, productImage: img1, review: "It's Awesome And Can Be Paired With Gold/Silver And Copper Junk Jewellery. It's Good Organic Material For Yoga And Meditation 🌟", rating: 4 },
  { id: 2, name: "Riya K.", image: img2, productImage: img1, review: "It's Awesome And Can Be Paired With Gold/Silver And Copper Junk Jewellery. It's Good Organic Material For Yoga And Meditation 🌟", rating: 5 },
  { id: 3, name: "Tanushri M.", image: img2, productImage: img1, review: "It's Awesome And Can Be Paired With Gold/Silver And Copper Junk Jewellery. It's Good Organic Material For Yoga And Meditation 🌟", rating: 4 },
  { id: 4, name: "Riya K.", image: img2, productImage: img1, review: "It's Awesome And Can Be Paired With Gold/Silver And Copper Junk Jewellery. It's Good Organic Material For Yoga And Meditation 🌟", rating: 5 }
];

const ReviewCard = ({ review, onClick }) => {
  return (
    <div className="Selected-review-card" onClick={() => onClick(review)}>
      <div className="Selected-review-header">
        <img src={review.image} alt={review.name} className="Selected-review-avatar" />
        <div className="Selected-review-text-content">
          <h3>{review.name} <span className="Selected-verified-icon"><img src={vectorimg} className="Selected-VerifiedUserIcon" /></span></h3>
          <p className="Selected-review-text">{review.review}</p>
        </div>
        <div className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
      </div>
      <div className="Selected-review-product-info">
        <img src={review.productImage} alt="Product" className="Selected-review-product-image" />
        <h3>It's Good Organic Material For Yoga And Meditation</h3>
        <button className="Selected-view-product">
          <LocalMallIcon className="Selected-review-mallicon" /> View Product
        </button>
      </div>
    </div>
  );
};

const ReviewModal = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <div className="Selected-review-modal-overlay" onClick={onClose}>
      <div className="Selected-review-modal" onClick={(e) => e.stopPropagation()}>
        <button className="Selected-close-button" onClick={onClose}><CloseIcon /></button>
        <div className="Selected-review-overlay-container">
          <div className="Selected-Image-overlay-design">
            <img src={review.image} alt="Product" className="Selected-modal-product-image" />
          </div>

          <div className="Selected-content-overlay-design">
            <div className="Selected-name-verified-icon-overlay">
              <h3>{review.name}</h3>
              <span className="Selected-verified-icon"> <p className="Selected-overlay-Verified-text ">Verified Purchase </p><img src={vectorimg} className="VerifiedUserIcon" /></span>
            </div>
            <div className="Selected-overlay-stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
            <p className="Selected-review-text-overlay">{review.review}</p>

            <div className="Selected-line-overlay"></div>
            <div className="Selected-overlayproduct-Container">
              <div>
                <img src={review.productImage} alt="" className="Selected-overlay-ProductImage" />
              </div>
              <div>
                <div className="Selected-overlayproduct-button-text">
                  {/* <h3 className="review-overlay-h3-text">{review.review}</h3> */}
                  <h3  className="Selected-review-overlay-h3-text">It's Good Organic Material For Yoga And Meditation</h3>
                  <button  className="Selected-overlay-View-product">  <LocalMallIcon className="Selected-review-mallicon-overlay" /> View Product</button>
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
};

const ReviewSection = () => {
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <div className="Selected-review-section">
      <h4>STORE / REVIEW</h4>
      <div className="Selected-review-top-heading">
        <h2>REVIEWS</h2>
        <img src={img3} className="Selected-underlinedesign" alt="" />
      </div>
      <div className="Selected-Topreview-with-text">
        <p className="Selected-top-review-stars">★ ★ ★ ☆ </p>
        <p className="Selected-review-count">1500 Reviews</p>
      </div>
      <div className="Selected-review-list">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} onClick={setSelectedReview} />
        ))}
      </div>
      <button className="next-button">NEXT <KeyboardDoubleArrowRightIcon className="KeyboardDoubleArrowRightIcon" /></button>
      <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
    </div>
  );
};

export default ReviewSection;
