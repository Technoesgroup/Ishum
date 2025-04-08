import React  from "react";
import '../../Style-CSS/BestSeller-css/BestSellerBanner.css';
import img1  from '../../images/SHREE_BLOG_BANNER 1.svg';

const Banner = ()=>{

    return(
       <div className="banner-container">
         <div  className="Banner-image">
           <img src={img1} alt="" />

        </div>
       </div>
    )
}

export default Banner;