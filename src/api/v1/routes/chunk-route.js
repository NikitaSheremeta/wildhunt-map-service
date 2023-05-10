const express = require('express');
const chunkController = require('../controllers/chunk-controller');

const router = express.Router();

router.post('/', chunkController.create);

router.get('/', chunkController.read);

router.put('/', chunkController.update);

router.delete('/', chunkController.delete);

module.exports = router;
