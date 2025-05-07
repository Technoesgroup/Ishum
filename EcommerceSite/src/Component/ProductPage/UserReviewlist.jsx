// ReviewCardList.js
import React, { useEffect, useState } from 'react';
import ReviewCard from './UserComments';
import '../../Style-CSS/ProductPage/UserReviewlist.css';
import axios from 'axios';

const ReviewCardList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/reviews');
        setReviews(res.data);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className='Review-list-user'>
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </div>
  );
};

export default ReviewCardList;
