// src/hooks/useMetaPixel.js
import { useEffect } from 'react';

const useMetaPixel = ({ location }) => {
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
      // console.log("Meta Pixel PageView triggered:", location.pathname);
    }
  }, [location.pathname]);
};

export default useMetaPixel;
