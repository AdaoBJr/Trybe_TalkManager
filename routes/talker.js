const express = require('express');

const router = express.Router();

const { getAllTalkers } = require('../routers/talkers');

router.route('/')
  .get(getAllTalkers);

module.exports = router;
