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

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await readFilePromise('talker.json')
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(`erro: ${err.message}`));

  const talker = talkers.find((talk) => talk.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

module.exports = router;
