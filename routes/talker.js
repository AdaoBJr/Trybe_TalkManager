const express = require('express');

const router = express.Router();

const { getAllTalkers } = require('../middleweres/talkers');

router.get('/', getAllTalkers);

module.exports = router;
