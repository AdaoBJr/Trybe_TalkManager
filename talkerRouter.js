const express = require('express');

const router = express.Router();

const { getTalkers, getTalkerById } = require('./middlewares');

router.get('/', async (_req, res) => {
  const talkerList = await getTalkers();
  if (!talkerList) return res.status(200).JSON.parse([]);

  res.status(200).send(talkerList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

module.exports = router;
