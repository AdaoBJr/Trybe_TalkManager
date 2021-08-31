const express = require('express');
const { readTalkerFile } = require('./utils');

const HTTP_OK_STATUS = 200;
const router = express.Router();

router.get('/', (req, res) => {
  const talkers = readTalkerFile();
  return res.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = router;
