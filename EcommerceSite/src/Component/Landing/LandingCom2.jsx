import React, { useEffect, useRef, useState } from 'react';
import '../../Style-CSS/Landing-css/LandingCom2.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Slider = () => {
  const [collections, setCollections] = useState([]);
  const scrollRef = useRef(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();


  // Fetch collections from backend
  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/get-collections`);
      setCollections(response.data.slice(0, 3)); // Only first 4
    } catch (error) {
      console.error("Error fetching collections", error);
    }
  };

const scrollLeft = () => {
  if (scrollRef.current.scrollLeft > 0) {
    scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth) {
    scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  }
};


  return (
    <div className="LandingComp2-slider-wrapper">
      <button className="LandingComp2-scroll-arrow left" onClick={scrollLeft}>
        &#8592;
      </button>

      <div className="LandingComp2-grid-container" ref={scrollRef}>
    {collections.map((collection) => (
  <div
    className="LandingComp2-card"
    key={collection._id}
    onClick={() =>
      navigate(`/co-page/${collection.title}`, {
        state: { collectionName: collection.title }
      })
    }
    style={{ cursor: 'pointer' }}
  >
    <div className="LandingComp2-image-container">
      <img loading="lazy" src={`${baseURL}${collection.image}`} alt={collection.name} />
      <button className="LandingComp2-hover-button">Select Collection</button>
    </div>
    <div className="LandingComp2-product-info">
      <h3 className="LandingComp2-title">{collection.title}</h3>
    </div>
  </div>
))}

      </div>

      <button className="LandingComp2-scroll-arrow right" onClick={scrollRight}>
        &#8594;
      </button>
    </div>
  );
};

export default Slider;
