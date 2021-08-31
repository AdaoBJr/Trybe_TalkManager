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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const readF = await readFile();
  const filtered = readF.find((resp) => Number(resp.id) === Number(id));
  if (!filtered) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(filtered);
});

module.exports = router;
