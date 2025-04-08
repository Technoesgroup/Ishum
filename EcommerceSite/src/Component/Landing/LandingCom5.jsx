import React from "react";
import GalleryC1 from '../../images/3bef9cdd8d336f92b3c37bdf3b94050d.jpeg';
import "../../Style-CSS/Landing-css/LandingCom5.css"

function Leaders(){
    return(
        <div className="LandingCom5-container_2">
            <div className="landingCom5-info">
                <h1>HAND-STITCHED PERFECTION</h1>
                <h3>Celebrate craftsmanship—your purchase uplifts the hands that create.</h3>
                <button  className="EXCLUSIVES-btn">SEE EXCLUSIVES</button>
            </div>
        <img src={GalleryC1} alt="Hero" className="LandingCom5-hero-img_2" />
      </div>
    )
}

export default Leaders;