import React from "react";
import { useNavigate } from "react-router-dom"; 
import Slider from "react-slick";
import "../../Style-CSS/Landing-css/LandingCom1.css";
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";
import heroImg1 from "../../images/Img-1.png";
import heroImg2 from "../../images/img-2.png";
import heroImg3 from "../../images/img-3.png";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function HomeC1() {
  
  const navigate = useNavigate();
  const handleIshumClick = () => {
    navigate("/"); 
  };

  // Custom Next Arrow
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow next-arrow" onClick={onClick}>
        <ChevronRightIcon  className="Right-icon"/>
      </div>
    );
  };

  // Custom Previous Arrow
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow prev-arrow" onClick={onClick}>
        <ChevronLeftIcon   className="Left-icon"/>
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
    arrows: true, // Show arrows
    nextArrow: <NextArrow />, // Custom Next Arrow
    prevArrow: <PrevArrow />, // Custom Prev Arrow
  };

  return (
    <div className="Home-container-box">
      <Slider {...settings} className="hero-slider">
        <div>
          <div className="hero-img-wrapper">
            <img src={heroImg1} alt="Slide 1" className="hero-img" />
          </div>
        </div>
        <div>
          <div className="hero-img-wrapper">
            <img src={heroImg2} alt="Slide 2" className="hero-img" />
          </div>
        </div>
        <div>
          <div className="hero-img-wrapper">
            <img src={heroImg3} alt="Slide 3" className="hero-img  hero-img-3" />
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default HomeC1;
