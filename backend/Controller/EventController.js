const sendEventToMeta = require('../Config/ConversionApi');

exports.trackEvent = async (req, res) => {
  try {
    const { eventName, customData, userData } = req.body;

    const response = await sendEventToMeta({
      pixelId: process.env.META_PIXEL_ID,
      accessToken: process.env.META_ACCESS_TOKEN,
      eventName,
      eventSourceUrl: req.headers.referer || '',
      userAgent: req.headers['user-agent'] || '',
      customData,
      userData
    });

    res.json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
