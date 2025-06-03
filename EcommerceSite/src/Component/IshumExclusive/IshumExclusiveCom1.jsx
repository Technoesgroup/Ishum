import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Slider from "react-slick";
import "../../Style-CSS/Landing-css/LandingCom1.css";
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";

// Desktop images
import heroImg1 from "../../images/emr (1920 x 800 px).png";
import heroImg2 from "../../images/lace (1920 x 800 px).png";
import heroImg3 from "../../images/pc (2240 x 1260 px) (1920 x 800 px).png";

// Mobile images
import heroImg4 from "../../images/emr (430 x 645 px).png";
import heroImg5 from "../../images/lace (430 x 645 px) (1).png";
import heroImg6 from "../../images/pc (2240 x 1260 px) (1920 x 800 px) (430 x 645 px).png";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function HomeC2() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIshumClick = () => {
    navigate("/"); 
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow next-arrow" onClick={onClick}>
        <ChevronRightIcon className="Right-icon" />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow prev-arrow" onClick={onClick}>
        <ChevronLeftIcon className="Left-icon" />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const desktopImages = [heroImg1, heroImg2, heroImg3];
  const mobileImages = [heroImg4, heroImg5, heroImg6];
  const imagesToRender = isMobile ? mobileImages : desktopImages;

  return (
    <div className="Home-container-box">
      <Slider {...settings} className="hero-slider">
        {imagesToRender.map((img, index) => (
          <div key={index}>
            <div className="hero-img-wrapper">
              <img loading="lazy" src={img} alt={`Slide ${index + 1}`} className="hero-img" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeC2;

