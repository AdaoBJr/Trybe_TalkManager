const express = require('express');
const getTalkers = require('../utils/getTalkers');

const { STATUS_OK } = require('../stats/constants');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(STATUS_OK).json(talkers);
});

module.exports = router;