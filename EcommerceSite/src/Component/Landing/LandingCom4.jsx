import React from "react";
import "../../Style-CSS/Landing-css/LandingCom4.css";
import img1 from '../../images/WhatsApp Image 2025-05-12 at 12.49.21_a44493b6.jpg'
import img2 from '../../images/WhatsApp Image 2025-05-12 at 12.49.19_ed1c6de7.jpg';
import img3 from '../../images/Cord4.jpg'
import img4 from '../../images/Cord5.jpg'
import UnderLine from '../../images/Undertextline.png';

const collections = [
  { title: "Ishum Fuchsia Bloom Embroidered Georgette Co-Ord Set", image:img1 },
  { title: "Ishum Noor Lime Radiance Cotton Muslin Co-Ord Set", image:img2},
  { title: "Ishum Noor Ivory Whisper Cotton Muslin Co-Ord Set", image:img3},
  { title: "Rangreez Cot-Cotton Co-ord Set with Delicate Lace Detailing", image:img4}
];

const CollectionSection = () => {
  return (
    <div className="LandingCom-4-collection-container">
       <div className="ishum-contents-MainHeading">
                  <h2 className="ishum-content-title">DEFINE CO-ORD SETS</h2>
                  <img className="ishum-contents-Com4-UnderLine" src={UnderLine} alt="" />
                </div>
  
      <div className="LandingCom-4-collection-grid">
        {collections.map((col, index) => (
         <div key={index} className="LandingCom-4-collection-item">
         <div className="LandingCom-4-image-wrapper">
           <img src={col.image} alt={col.title} className="LandingCom-4-collection-image" />
           <div className="LandingCom-4-overlay" />
         </div>
         <div className="LandingCom-4-collection-info">
           {/* <span> */}
             <button className="LandingCom-4-view-more">VIEW PRODUCTS</button>
           {/* </span> */}
         </div>
       </div>
       
        ))}
      </div>
      <button className="LandingCom-4-view-all-button">SEE EXCLUSIVES</button>
    </div>
  );
};

export default CollectionSection;




















// Ishum Fuchsia Bloom Embroidered Georgette Co-Ord Set
// Ishum Noor Lime Radiance Cotton Muslin Co-Ord Set
//Ishum Noor Ivory Whisper Cotton Muslin Co-Ord Set
// Rangreez Cot-Cotton Co-ord Set with Delicate Lace Detailing