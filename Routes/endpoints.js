const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const reader = () => {
  const file = fs.readFile('./talker.json', 'utf8')
  .then((r) => JSON.parse(r));
  return file;
};

router.get('/', async (req, res) => {
  const read = await reader();
  if (!read) return res.status(200).json(Array.from([]));
});

module.exports = router;
