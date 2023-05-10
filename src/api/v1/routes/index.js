const express = require('express');
const chunkRoute = require('./chunk-route');

const router = express.Router();

router.use('/chunk', chunkRoute);

module.exports = router;
