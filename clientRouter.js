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
  res.status(200).json(talkerById);
};

// ROUTES

router.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  console.log(talkers);
  res.status(200).json(talkers);
});

router.get('/:id', getTalkerById);

module.exports = router;