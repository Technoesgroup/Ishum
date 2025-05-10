import React, { useEffect, useState } from 'react';
import ReviewCard from './UserComments'; // ✅ Ye hi card render karna hai
import '../../Style-CSS/ProductPage/UserReviewlist.css';
import axios from 'axios';
import { useProduct } from "../../ContextApiCart/ProductContextApi";

const ReviewCardList = () => {
  const { selectedProduct, setSelectedProduct } = useProduct();
  const [reviews, setReviews] = useState([]);

  const productId = selectedProduct?._id;

  const baseURL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    if (!productId) return; // ✅ Prevent call if undefined

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/get-reviews/${productId}`);

        console.log("📦 Reviews Fetched:", res.data);
        setReviews(res.data);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div className='Review-list-user'>
      {reviews.map((review, index) => (  
         <ReviewCard key={index} {...review} />
        // ✅ Yahi render karo
      ))}
    </div>
  );
};

export default ReviewCardList;


