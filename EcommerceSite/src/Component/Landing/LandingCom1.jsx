import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Slider from "react-slick";
import "../../Style-CSS/Landing-css/LandingCom1.css";
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";
import heroImg1 from "../../images/Banner1.png";
import heroImg2 from "../../images/Banner4.png";
import heroImg3 from "../../images/Banner9.png";
import heroImg4 from "../../images/Banner7.png";
import heroImg5 from "../../images/Banner5.png";
import heroImg6 from "../../images/Banner3.png";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function HomeC1() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              <img src={img} alt={`Slide ${index + 1}`} className="hero-img" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeC1;



