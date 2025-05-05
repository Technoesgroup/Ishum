// ReviewCardList.js
import React from 'react';
import ReviewCard from './UserComments';
import '../../Style-CSS/ProductPage/UserReviewlist.css'
import img1 from '../../images/471fb4242b2cec38c1fe410bd07dc7be.png'
import img2 from '../../images/471fb4242b2cec38c1fe410bd07dc7be.png'
import img3 from '../../images/471fb4242b2cec38c1fe410bd07dc7be.png'
import img4 from '../../images/471fb4242b2cec38c1fe410bd07dc7be.png'


const reviews = [
  {
    rating: 5,
    title: 'Perfect Product',
    content: 'Mind Blowing phone go for it great performance camera is amazing you can look the shot with AI generation background was totally cleared from the crowd just go for it better than Iphone 15.',
    image: img1,
    name: 'Harsh Rajput',
    location: 'Certified Buyer, Rudrapur',
    date: 'Jan, 2024',
    likes: 656,
    dislikes: 152,
  },
  {
    rating: 5,
    title: 'Awesome',
    content: 'Completely satisfied with purchase.',
    image: img2,
    name: 'Ravi Kumar',
    location: 'Certified Buyer, Bareilly',
    date: 'Feb, 2024',
    likes: 871,
    dislikes: 193,
  },
  {
    rating: 5,
    title: 'Just Wow!',
    content: 'Amazing battery backup and performance. Display is very smooth and fast.',
    image: img2,
    name: 'Sneha Singh',
    location: 'Certified Buyer, Lucknow',
    date: 'Mar, 2024',
    likes: 521,
    dislikes: 103,
  },
  {
    rating: 4,
    title: 'Very Good',
    content: 'Phone is good overall. Camera quality is impressive but the battery could be better.',
    image: img3,
    name: 'Aman Verma',
    location: 'Certified Buyer, Noida',
    date: 'Apr, 2024',
    likes: 402,
    dislikes: 88,
  },
];

const ReviewCardList = () => {
  return (
    <div  className='Review-list-user'>
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </div>
  );
};

export default ReviewCardList;
