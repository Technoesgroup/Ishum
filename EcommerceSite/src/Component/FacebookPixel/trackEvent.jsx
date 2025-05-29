export const trackEvent = async (eventName, customData = {}, userData = {}) => {
  try {
    const response = await fetch('/api/track-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventName,
        customData,
        userData
      })
    });

    const data = await response.json();
    console.log('Event tracked:', data);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
