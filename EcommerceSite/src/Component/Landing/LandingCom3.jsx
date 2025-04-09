import React, { useState, useEffect } from "react";
import "../../Style-CSS/Landing-css/LandingCom3.css";
import axios from "axios";
import UnderLine from '../../images/Undertextline.png';

const CollectionSection = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get("http://localhost:4000/collectionsSec");
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections", error);
    }
  };

  return (
    <div className="LandingCom-3-collection-container">
      <div className="ishum-contents-MainHeading">
                 <h2 className="ishum-content-title">EXCLUSIVE  & NEW LAUNCHED COLLECTION</h2>
                 <img className="ishum-contents-Com3-UnderLine" src={UnderLine} alt="" />
               </div>
     
      <div className="LandingCom-3-collection-grid">
        {collections.map((col, index) => (
          <div key={index} className="LandingCom-3-collection-item">
            <img 
              src={`http://localhost:4000${col.image}`} 
              alt={col.title} 
              className="LandingCom-3-collection-image" 
            />
            <div className="LandingCom-3-collection-info">
              <p className="LandingCom-3-collection-name">{col.title}</p>
              <p className="LandingCom-3-view-more">VIEW MORE →</p>
            </div>
          </div>
        ))}
      </div>
      <button className="LandingCom-3-view-all-button">VIEW ALL COLLECTIONS</button>
    </div>
  );
};

export default CollectionSection;