const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const readFile = () => {
    const file = fs.readFile('./talker.json', 'utf8')
    .then((response) => JSON.parse(response));
    return file;
};

router.get('/', async (_req, res) => {
  const read = await readFile();
  if (!read) return res.status(200).json(Array.from([]));
  res.status(200).json(read);
});

module.exports = router;