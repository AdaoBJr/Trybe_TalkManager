const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const getTalkers = async () => JSON.parse(await fs.readFile('./talker.json', 'utf-8'));

router.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();
  return talkers.length === 0
  ? res.status(200).json([])
  : res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === Number(id));

  return !talker
  ? res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
  : res.status(200).json(talker);
});

module.exports = router;
