const express = require('express');

const router = express.Router();

const { getAllTalkers } = require('../middleweres/talkers');

router.route('/')
  .get(getAllTalkers);

module.exports = router;
