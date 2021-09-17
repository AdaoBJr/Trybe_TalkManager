const express = require('express');
const {
  getAllTalkers,
  writeNewTalker,
} = require('./fsModule');
const {
  getTalkerById,
  checkHeaderToken,
  validateTalker,
} = require('./talkerMiddlewares');

const talkerRouter = express.Router();

talkerRouter.get('/', async (_req, res) => {
  const talkers = await getAllTalkers;
  console.log(talkers);
  // if (talkers.length === 0) {
  //   return res.status(200).json([]);
  // }
  return res.status(200).json(talkers);
});

talkerRouter.get('/:id', getTalkerById);

talkerRouter.post('/', checkHeaderToken, validateTalker, async (req, res) => {
  const {
    name, age, talk,
  } = req.body;
  const talkers = await getAllTalkers;
  const talker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  await writeNewTalker(talker);

  console.log('last step');
  return res.status(201).json(talker);
});

module.exports = talkerRouter;