import React, { useState } from "react";
import ReactPlayer from "react-player";
import "../../Style-CSS/Landing-css/LandingCom12.css";
import V1 from "../../images/SaveClip.App_AQN_U3zxSoTprjVzYk8ojoaCmBjlM9mFB8lAhvWY-cd0L-6FEdLhGDt2n9f2n8rpNO4mCmC16auHP9fPER77KthzZQzJNgPz505VgzU.mp4"
import V2 from "../../images/SaveClip.App_AQPUmbpCy5q_gGu_6uzrO6hUd2sGAub_ACJlhItBE8RklxcQcBldcFcHR47ilhz5MM4_gVBixBUReQknZPDvCrHGxhYjZyA8g4O8AKU.mp4"
import V3 from "../../images/SaveClip.App_AQPxm9QIsh7Fg9tfp6EuiGeTIzHNCTkkJxOJWlNhQ-IZyS0MCXP_zhlnvFoIfSYJvtbzBZ3Qid-fhtypY5pUXu7C40999YcYx0LGJUs.mp4"
import V4 from "../../images/SaveClip.App_AQPtpNTxbN7ibyTm_Cs7fEwVidlB6T2COnoOFP5y9ZMYtL2EstZqAnVfoYiwF0eoBesWcIv1JmEYxPZ3_AkEJaqLEjppgbOqy8SNywA.mp4"
import V5 from "../../images/V5.mp4"
const videos = [
  {
    url: V1, // your own hosted .mp4 video
    link: "https://www.instagram.com/reel/DKPR-yCTrf0/",
  },
  {
    url: V2,
    link: "https://www.instagram.com/reel/DKMqPWpzi05/",
  },
  {
    url: V3,
    link: "https://www.instagram.com/reel/DJ3VHWYz9jN/",
  },
 {
    url: V4,
    link: "https://www.instagram.com/reel/DJ3VHWYz9jN/",
  },
   {
    url: V4,
    link: "https://www.instagram.com/reel/DJ3VHWYz9jN/",
  },
     {
    url: V5,
    link: "https://www.instagram.com/reel/DJ3VHWYz9jN/",
  },
];

const TrendingVideos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      <h2>Trending Looks To Watch</h2>
      <div className="carousel">
        <button className="arrow left" onClick={prevSlide}>
          &#10094;
        </button>

        {videos.map((video, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + videos.length) % videos.length;
          const isNext = index === (currentIndex + 1) % videos.length;

          return (
            <div
              key={index}
              className={`carousel-item ${
                isActive ? "active" : isPrev || isNext ? "side" : "hidden"
              }`}
              onClick={() => isActive && window.open(video.link, "_blank")}
            >
              <ReactPlayer
                url={video.url}
                playing={isActive}
                muted
                loop
                width="100%"
                height="100%"
                className="video-player"
              />
            </div>
          );
        })}

        <button className="arrow right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default TrendingVideos;
