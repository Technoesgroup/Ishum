// SwipeWrapper.jsx
import React from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

const SwipeWrapper = ({ children }) => {
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // Go to next route (you define logic)
      navigate("/bestseller"); // customize based on your app
    },
    onSwipedRight: () => {
      // Go back
      navigate(-1); // this goes to previous page
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div {...handlers} style={{ height: "100%" }}>
      {children}
    </div>
  );
};

export default SwipeWrapper;
