import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import "../../Style-CSS/Landing-css/LandingCom12.css";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import V1 from "../../images/SaveClip.App_AQN_U3zxSoTprjVzYk8ojoaCmBjlM9mFB8lAhvWY-cd0L-6FEdLhGDt2n9f2n8rpNO4mCmC16auHP9fPER77KthzZQzJNgPz505VgzU.mp4";
import V2 from "../../images/SaveClip.App_AQPUmbpCy5q_gGu_6uzrO6hUd2sGAub_ACJlhItBE8RklxcQcBldcFcHR47ilhz5MM4_gVBixBUReQknZPDvCrHGxhYjZyA8g4O8AKU.mp4";
import V3 from "../../images/SaveClip.App_AQPxm9QIsh7Fg9tfp6EuiGeTIzHNCTkkJxOJWlNhQ-IZyS0MCXP_zhlnvFoIfSYJvtbzBZ3Qid-fhtypY5pUXu7C40999YcYx0LGJUs.mp4";
import V4 from "../../images/SaveClip.App_AQPtpNTxbN7ibyTm_Cs7fEwVidlB6T2COnoOFP5y9ZMYtL2EstZqAnVfoYiwF0eoBesWcIv1JmEYxPZ3_AkEJaqLEjppgbOqy8SNywA.mp4";
import V5 from "../../images/V5.mp4";
import V6 from "../../images/top-video.mp4";

const videoData = [
  { url: V1, link: "https://www.instagram.com/reel/DKPR-yCTrf0/" },
  { url: V6, link: "https://www.instagram.com/reel/DKMqPWpzi05/" },
  { url: V2, link: "https://www.instagram.com/reel/DJ3VHWYz9jN/" },
  { url: V4, link: "https://www.instagram.com/reel/DJ3VHWYz9jN/" },
  { url: V3, link: "https://www.instagram.com/reel/DJ3VHWYz9jN/" },
  { url: V5, link: "https://www.instagram.com/reel/DJ3VHWYz9jN/" },
];

const TrendingVideos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mutedStates, setMutedStates] = useState(videoData.map(() => true));
  const playerRef = useRef(null);

  const toggleMute = (index) => {
    const updated = [...mutedStates];
    updated[index] = !updated[index];
    setMutedStates(updated);
  };

  const nextSlide = () => {
    if (currentIndex < videoData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
const handleVideoEnd = () => {
  if (currentIndex < videoData.length - 1) {
    setCurrentIndex((prev) => prev + 1);
  }
};


  return (
    <div className="ishum-stack-container">
      <h2>Trending Looks To Watch</h2>

      <div className="ishum-stack-wrapper">
        {videoData.map((video, index) => {
          const isActive = index === currentIndex;
          const isVisible = index >= currentIndex;

          return (
            <div
              key={index}
              className={`ishum-stack-card ${isActive ? "ishum-active" : "behind"}`}
              style={{
                zIndex: videoData.length - index,
                transform: isActive
                  ? "translateY(0px) scale(1)"
                  : `translateY(${(index - currentIndex) * 10}px) scale(0.95)`,
                opacity: isActive ? 1 : 0.6,
                display: isVisible ? "block" : "none",
              }}
              onClick={() => isActive && window.open(video.link, "_blank")}
            >
              <button
                className="ishum-mute-toggle-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute(index);
                }}
              >
                {mutedStates[index] ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </button>

          <ReactPlayer
  url={video.url}
  playing={isActive}
  muted={mutedStates[index]}
  loop={false}
  onEnded={handleVideoEnd}
  width="100%"
  height="100%"
  className="video-player"
/>

            </div>
          );
        })}
<div className="ishum-stack-controls">
  <button onClick={prevSlide} disabled={currentIndex === 0}>⬅</button>
  <button onClick={nextSlide} disabled={currentIndex === videoData.length - 1}>➡</button>
</div>

      </div>
    </div>
  );
};

export default TrendingVideos;



