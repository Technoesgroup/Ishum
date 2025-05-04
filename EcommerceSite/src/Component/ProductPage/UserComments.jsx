// ReviewCard.js
import React from 'react';
import '../../Style-CSS/ProductPage/UserComments.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';

const ReviewCard = ({ rating, title, content, image, name, location, date, likes, dislikes }) => {
  return (
    <div className="review-card">
      <div className="rating-badge">
        <span>5★</span>
      </div>
      <h4 className="review-title">Perfect Product</h4>
      <p className="review-content">Mind Blowing phone go for it great performance camera is amazing you can look the shot with AI generation background was totally cleared from the crowd just go for it better than Iphone 15.</p>
      {image && <img src={image} alt="review" className="review-img" />}
      <div className="reviewer-info">
        <strong>Harsh Rajput</strong>
        <OfflinePinIcon className="verified-icon" />
        <span className="location">{location}</span>
        <span className="date">{date}</span>
      </div>
      <div className="feedback">
        <span><ThumbUpIcon /> {likes}</span>
        <span><ThumbDownIcon /> {dislikes}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
