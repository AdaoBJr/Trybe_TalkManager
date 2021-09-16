const express = require('express');
const {
  getAllTalkers,
} = require('./fsModule');

const router = express.Router();

// MIDDLEWARES

const getTalkerById = async (req, res) => {
  const {
    id,
  } = req.params;
  const talkers = await getAllTalkers();
  const talkerById = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (talkerById) return res.status(200).json(talkerById);

  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
};

// ROUTES

router.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  console.log(talkers);
  if (talkers) {
    return res.status(200).json(talkers);
  }
  return res.status(200).json([]);
});

router.get('/:id', getTalkerById);

module.exports = router;