import React, { useState } from "react";
import "../../Style-CSS/ProductPage/UserReview.css";
import ReviewForm from "./ReviewForm"; 

const RatingsReviews = () => {
  const [showForm, setShowForm] = useState(false);

  const handleRateClick = () => {
    setShowForm(true);
  };

  return (
    <div className="ratings-container">
      <h2>Ratings & Reviews</h2>
      <div className="main-rating">
        <div className="average-rating">
          <h1>4.5 <span>&#9733;</span></h1>
          <p>1,813 Ratings &<br />176 Reviews</p>
        </div>
        <div className="rating-bars">
        <div className="bar"><span>5 &#9733;</span><div className="progress" style={{ width: '80%' }}></div><span>1,342</span></div>
          <div className="bar"><span>4 &#9733;</span><div className="progress" style={{ width: '16%' }}></div><span>267</span></div>
          <div className="bar"><span>3 &#9733;</span><div className="progress" style={{ width: '5%' }}></div><span>70</span></div>
          <div className="bar"><span>2 &#9733;</span><div className="progress" style={{ width: '2%' }}></div><span>36</span></div>
          <div className="bar"><span>1 &#9733;</span><div className="progress red" style={{ width: '6%' }}></div><span>98</span></div>
        </div>
        <div><button onClick={handleRateClick}>Rate Us</button></div>
      </div>

      <div className="image-gallery">
        <img src="img1.jpg" alt="Review" />
        <img src="img2.jpg" alt="Review" />
        <img src="img3.jpg" alt="Review" />
        <img src="img4.jpg" alt="Review" />
        <img src="img5.jpg" alt="Review" />
        <img src="img6.jpg" alt="Review" />
        <div className="more-images">
          <span>+94</span>
        </div>
      </div>

      {showForm && (
        <div className="Reviews-modal-overlay">
          <div className="Reviews-modal-content">
            <ReviewForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingsReviews;




















