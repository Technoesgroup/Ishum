import React from 'react';
import '../../Style-CSS/ProductPage/UserComments.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';

const ReviewCard = ({ rating, title, content, image, name, location, date, likes = 0, dislikes = 0 }) => {
  const imageUrl = `http://localhost:4000/uploads/${image}`;
  console.log(name);
  return (
    <div className="review-card">
      <div className="rating-badge">
        <span>{rating}★</span>
      </div>
      <h4 className="review-title">{title}</h4>
      <p className="review-content">{content}</p>
      {image && <img src={imageUrl} alt="review" className="review-img" />}
      <div className="reviewer-info">
        <strong>{name}</strong>
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

