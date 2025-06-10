import React from 'react';
import '../../Style-CSS/Landing-css/LandingCom10.css';
import brideImg from '../../images/b7c0458edce18027db5028842fd3cc17-removebg-preview.png'; // Keep this as is or replace with related image
import { useNavigate } from 'react-router-dom';

const PersonalistSection = () => {

  const navigate = useNavigate();
  return (
    <div className="LandingCom10-personalist-section">
      <div className="LandingCom10-left-content">
        <p className="LandingCom10-top-text">
          Discover timeless elegance with our handcrafted collection of Anarkalis, graceful Suits, luxurious Lehengas, and statement Shararas — made to celebrate you.
        </p>
        <h2 className="LandingCom10-logo">
          <span className="LandingCom10-logo-bold">Personalist it!</span>
          <span className="LandingCom10-heart">❤</span>
        </h2>
        <p className="LandingCom10-subtext">FOR YOUR <span className="LandingCom10-pink">SIGNATURE STYLE</span></p>
        <p className="LandingCom10-bottom-text">
          From intricate embroidery to flowing silhouettes, our ethnic wear redefines elegance for every occasion. Whether it’s a festive celebration or a special gathering, our curated pieces bring out your inner diva in every drape and detail.
        </p>
        <button className="LandingCom10-learn-more"  onClick={() => navigate('/Collection')}>Explore Collection</button>
      </div>
      <div className="LandingCom10-right-image">
        <img loading="lazy" src={brideImg} alt="Ethnic Wear" />
      </div>
    </div>
  );
};

export default PersonalistSection;

