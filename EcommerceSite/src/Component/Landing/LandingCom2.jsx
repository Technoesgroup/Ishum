import React, { useEffect, useRef, useState } from 'react';
import '../../Style-CSS/Landing-css/LandingCom2.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Slider = () => {
  const [collections, setCollections] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const scrollRef = useRef(null);

const baseURL ="http://localhost:4000";

  const navigate = useNavigate();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/get-collections`);
      setCollections(response.data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching collections", error);
    }
  };

const scrollLeft = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({
      left: -scrollRef.current.offsetWidth * 0.8,
      behavior: 'smooth',
    });
  }
};

const scrollRight = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({
      left: scrollRef.current.offsetWidth * 0.8,
      behavior: 'smooth',
    });
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
      {console.log("Image path:", collection.image)}
  <div className="LandingComp2-image-container">
  {/* Skeleton loader */}
  {!loadedImages[collection._id] && (
    <div className="LandingComp2-skeleton-loader"></div>
  )}


  <img
    loading="lazy"
    src={`${baseURL}${collection.image}`}
    alt={collection.name}
    style={{
      display: loadedImages[collection._id] ? 'block' : 'none'
    }}
    onLoad={() =>
      setLoadedImages((prev) => ({
        ...prev,
        [collection._id]: true
      }))
    }
  />
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

