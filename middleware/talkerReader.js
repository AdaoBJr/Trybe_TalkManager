const fs = require('fs').promises;
const express = require('express');

const router = express.Router();

const fileReader = async () => {
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkerList);
};

router.get('/', async (req, res) => {
  const talkers = await fileReader();
return res.status(200).send(talkers);
});

module.exports = router;