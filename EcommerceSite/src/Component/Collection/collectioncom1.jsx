import React from 'react';
import '../../Style-CSS/Collection-css/Collectioncom1.css';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const CollectionCom1 = () => {
  const categories = [
    'Gulzar',
    'Anarkali',
    'Sharara Suits',
    'Rangrez',
    'Jashn E Rang',
    'NOOR',
    'Sawariya'
  ];

  return (
    <div className="collection-wrapper">
      <div className="breadcrumb">Store / Collection</div>
      <h1 className="collection-title">Collections</h1>
      <p className="collection-description">
        Collection from Ishum transport you to a world of timeless elegance that redefines grace and sophistication! At Ishum, we bring you a stunning collection online designed to make every woman feel effortlessly beautiful.
      </p>

      <div className="category-scroll-container">
        <button className="scroll-button left">
          <TrendingFlatIcon style={{ transform: 'rotate(180deg)' }} />
        </button>

        <div className="category-scroll">
          {categories.map((cat, index) => (
            <div key={index} className="category-pill">
              {cat}
            </div>
          ))}
        </div>

        <button className="scroll-button right">
          <TrendingFlatIcon />
        </button>
      </div>
    </div>
  );
};

export default CollectionCom1;
