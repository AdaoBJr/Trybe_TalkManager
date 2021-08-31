const express = require('express');
const fs = require('fs').promises;
// const talkers = require('../talker.json');

console.log(typeof talkers);

const router = express.Router();
const HTTP_OK_STATUS = 200;

const getTalkerList = async () => {
  const list = await fs.readFile('./talker.json', 'utf-8');
  console.log(list);
  return JSON.parse(list);
};

router.get('/', async (_req, res) => {
  const talkersList = await getTalkerList();
  res.status(HTTP_OK_STATUS).json(talkersList);
});

module.exports = router;
