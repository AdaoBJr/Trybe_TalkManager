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

router.get('/:id', async (req, res) => {
  const { id } req.params;
  const read = await readFile();
  const filter = read.find((r) => Number(r.id) === Number(id));
  if (!filter) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(filter);
});

module.exports = router;
