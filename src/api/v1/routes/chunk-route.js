const express = require('express');
const chunkController = require('../controllers/chunk-controller');

const router = express.Router();

router.post('/', chunkController.post);

module.exports = router;
