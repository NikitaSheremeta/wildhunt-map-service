const express = require('express');
const chunkController = require('../controllers/chunk-controller');

const router = express.Router();

router.post('/', chunkController.post);

router.get('/', chunkController.get);

// router.get('/:name', chunkController.get);

module.exports = router;
