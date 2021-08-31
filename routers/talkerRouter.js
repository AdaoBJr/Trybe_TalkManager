const express = require('express');

const router = express.Router();

const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

router.get('/', async (req, res) => {
  const talkers = await readFilePromise('talker.json')
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(`erro: ${err.message}`));

  if (!talkers) res.status(200).json([]);

  return res.status(200).json(talkers);
});

module.exports = router;
