const express = require('express');
const router = express.Router();
const { trackEvent } = require('../Controller/EventController');

router.post('/track-event', trackEvent);

module.exports = router;
