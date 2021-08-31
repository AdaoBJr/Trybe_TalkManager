const express = require('express');
const {
  getAllTalkers,
  getTalkerById,
} = require('../middlewares');

const router = express.Router();

router.get('/', async (req, res) => {
  const allTalkers = await getAllTalkers();
  if (allTalkers) return res.status(200).send(allTalkers);
  return res.status(404).json({ message: 'Not found!' });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(id);
  if (talkerById) return res.status(200).json(talkerById);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;
