import React, { useState, useEffect } from "react";
import "../../Style-CSS/Landing-css/LandingCom2.css";
import axios from "axios";
import UnderLine from '../../images/Undertextline.png';

const CollectionSection = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get("http://localhost:4000/collections");
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections", error);
    }
  };

  return (
    <div className="LandingCom-2-collection-container">
    <div className="ishumCom-2-contents-MainHeading">
            <h2 className="ishum-content-title">SHOP BY COLLECTION</h2>
            <img className="ishum-contents-Com2-UnderLine" src={UnderLine} alt="" />
          </div>
   
      <div className="LandingCom-2-collection-grid">
        {collections.map((col, index) => (
          <div key={index} className="LandingCom-2-collection-item">
            <img 
              src={`http://localhost:4000${col.image}`} 
              alt={col.title} 
              className="LandingCom-2-collection-image" 
            />
            <div className="LandingCom-2-collection-info">
              <p className="LandingCom-2-collection-name">{col.title}</p>
              <p className="LandingCom-2-view-more">VIEW MORE →</p>
            </div>
          </div>
        ))}
      </div>
      <button className="LandingCom-2-view-all-button">VIEW ALL COLLECTIONS</button>
    </div>
  );
};

export default CollectionSection;

