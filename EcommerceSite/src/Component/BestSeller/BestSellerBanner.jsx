import React  from "react";
import '../../Style-CSS/BestSeller-css/BestSellerBanner.css';
import img1  from '../../images/Banner6.png';
import img2 from '../../images/Banner5.png';

const Banner = ()=>{

    return(
       <div className="banner-container">
         <div  className="Banner-image">
           <img src={img1} alt=""   className="banner6"/>
           <img src={img2} alt=""  className="banner5" />
        </div>
       </div>
    )
}

export default Banner;