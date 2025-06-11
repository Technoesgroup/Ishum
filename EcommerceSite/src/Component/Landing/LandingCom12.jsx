import React, { useState } from "react";
import ReactPlayer from "react-player";
import "../../Style-CSS/Landing-css/LandingCom12.css";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import V1 from "../../images/SaveClip.App_AQN_U3zxSoTprjVzYk8ojoaCmBjlM9mFB8lAhvWY-cd0L-6FEdLhGDt2n9f2n8rpNO4mCmC16auHP9fPER77KthzZQzJNgPz505VgzU.mp4";
import V2 from "../../images/SaveClip.App_AQPUmbpCy5q_gGu_6uzrO6hUd2sGAub_ACJlhItBE8RklxcQcBldcFcHR47ilhz5MM4_gVBixBUReQknZPDvCrHGxhYjZyA8g4O8AKU.mp4";
import V3 from "../../images/SaveClip.App_AQPxm9QIsh7Fg9tfp6EuiGeTIzHNCTkkJxOJWlNhQ-IZyS0MCXP_zhlnvFoIfSYJvtbzBZ3Qid-fhtypY5pUXu7C40999YcYx0LGJUs.mp4";
import V4 from "../../images/SaveClip.App_AQPtpNTxbN7ibyTm_Cs7fEwVidlB6T2COnoOFP5y9ZMYtL2EstZqAnVfoYiwF0eoBesWcIv1JmEYxPZ3_AkEJaqLEjppgbOqy8SNywA.mp4";
import V5 from "../../images/V5.mp4";

const videoData = [
  { url: V1, link: "https://www.instagram.com/reel/DKPR-yCTrf0/" },
  { url: V2, link: "https://www.instagram.com/reel/DKMqPWpzi05/" },
  { url: V3, link: "https://www.instagram.com/reel/DJ3VHWYz9jN/" },
  { url: V4, link: "https://www.instagram.com/reel/DJ3VHWYz9jN/" },
  { url: V4, link: "https://www.instagram.com/reel/DJ3VHWYz9jN/" },
  { url: V5, link: "https://www.instagram.com/reel/DJ3VHWYz9jN/" },
];

const TrendingVideos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mutedStates, setMutedStates] = useState(videoData.map(() => true)); // mute all by default

  const toggleMute = (index) => {
    const updated = [...mutedStates];
    updated[index] = !updated[index];
    setMutedStates(updated);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? videoData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === videoData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      <h2>Trending Looks To Watch</h2>

      <div className="carousel">
        <button className="arrow left" onClick={prevSlide}>
          &#10094;
        </button>

        {videoData.map((video, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + videoData.length) % videoData.length;
          const isNext = index === (currentIndex + 1) % videoData.length;

          return (
            <div
              key={index}
              className={`carousel-item ${
                isActive ? "active" : isPrev || isNext ? "side" : "hidden"
              }`}
              onClick={() => isActive && window.open(video.link, "_blank")}
            >
              <button
                className="mute-toggle-icon"
                onClick={(e) => {
                  e.stopPropagation(); // prevent opening link on click
                  toggleMute(index);
                }}
              >
                {mutedStates[index] ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </button>

              <ReactPlayer
                url={video.url}
                playing={isActive}
                muted={mutedStates[index]}
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

