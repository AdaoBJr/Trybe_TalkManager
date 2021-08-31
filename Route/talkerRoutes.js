const express = require('express');
const utils = require('../utils');

const router = express.Router();
const HTTP_OK_STATUS = 200;

router.get('/', async (req, res) => {
  const fileContent = await utils.readFile('./talker.json');
  return res.status(HTTP_OK_STATUS).json(fileContent);
});

// router.get('/:id', (req, res) => {
//   return res.send('tetste');
// });

module.exports = router;
