// src/context/PixelContext.js
import React, { createContext, useContext, useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';

const PixelContext = createContext();

export const PixelProvider = ({ children }) => {
    useEffect(() => {
        ReactPixel.init('1436151217405080');  // 🔥 replace with actual Pixel ID
        ReactPixel.pageView();  // optional: track initial page view
    }, []);

    const trackEvent = (event, data = {}) => {
        ReactPixel.track(event, data);
    };

    const trackPageView = () => {
        ReactPixel.pageView();
    };

    return (
        <PixelContext.Provider value={{ trackEvent, trackPageView }}>
            {children}
        </PixelContext.Provider>
    );
};

export const usePixel = () => {
    const context = useContext(PixelContext);
    if (!context) {
        throw new Error('usePixel must be used within a PixelProvider');
    }
    return context;
};

