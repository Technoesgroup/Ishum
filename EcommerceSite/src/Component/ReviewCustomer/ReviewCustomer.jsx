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
    <div className="review-card" onClick={() => onClick(review)}>
      <div className="review-header">
        <img src={review.image} alt={review.name} className="review-avatar" />
        <div className="review-text-content">
          <h3>{review.name} <span className="verified-icon"><img src={vectorimg} className="VerifiedUserIcon" /></span></h3>
          <p className="review-text">{review.review}</p>
        </div>
        <div className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
      </div>
      <div className="review-product-info">
        <img src={review.productImage} alt="Product" className="review-product-image" />
        <h3>It's Good Organic Material For Yoga And Meditation</h3>
        <button className="view-product">
          <LocalMallIcon className="review-mallicon" /> View Product
        </button>
      </div>
    </div>
  );
};

const ReviewModal = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}><CloseIcon /></button>
        <div className="review-overlay-container">
          <div className="Image-overlay-design">
            <img src={review.image} alt="Product" className="modal-product-image" />
          </div>

          <div className="content-overlay-design">
            <div className="name-verified-icon-overlay">
              <h3>{review.name}</h3>
              <span className="verified-icon"> <p className="overlay-Verified-text ">Verified Purchase </p><img src={vectorimg} className="VerifiedUserIcon" /></span>
            </div>
            <div className="overlay-stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
            <p className="review-text-overlay">{review.review}</p>

            <div className="line-overlay"></div>
            <div className="overlayproduct-Container">
              <div>
                <img src={review.productImage} alt="" className="overlay-ProductImage" />
              </div>
              <div>
                <div className="overlayproduct-button-text">
                  {/* <h3 className="review-overlay-h3-text">{review.review}</h3> */}
                  <h3  className="review-overlay-h3-text">It's Good Organic Material For Yoga And Meditation</h3>
                  <button  className="overlay-View-product">  <LocalMallIcon className="review-mallicon-overlay" /> View Product</button>
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
    <div className="review-section">
      <h4>STORE / REVIEW</h4>
      <div className="review-top-heading">
        <h2>REVIEWS</h2>
        <img src={img3} className="underlinedesign" alt="" />
      </div>
      <div className="Topreview-with-text">
        <p className="top-review-stars">★ ★ ★ ☆ </p>
        <p className="review-count">1500 Reviews</p>
      </div>
      <div className="review-list">
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
