const express = require('express');
const {
  getAllTalkers,
  writeNewTalker,
  writeUpdatedTalkers,
} = require('./fsModule');
const {
  getTalkerById,
  checkHeaderToken,
  validateTalker,
} = require('./talkerMiddlewares');

const talkerRouter = express.Router();

talkerRouter.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (talkers.length === 0) {
      return res.status(200).json([]);
    }
  // console.log(talkers);
  return res.status(200).json(talkers);
});

talkerRouter.get('/:id', getTalkerById);

talkerRouter.post('/', checkHeaderToken, validateTalker, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getAllTalkers();
  const talker = {
    name,
    age,
    id: talkers.length + 1,
    talk,
  };
  await writeNewTalker(talker);
  console.log('last step');
  return res.status(201).json(talker);
});

talkerRouter.put('/:id', checkHeaderToken, validateTalker, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const allTalkers = await getAllTalkers();
  console.log(allTalkers);
  const talkerIndex = allTalkers.findIndex((talker) => talker.id === parseInt(id, 10));
  allTalkers[talkerIndex] = await {
    ...allTalkers[talkerIndex],
    name,
    age,
    talk,
  };
  await writeUpdatedTalkers(allTalkers);
  return res.status(200).json(allTalkers[talkerIndex]);
});

talkerRouter.delete('/:id', checkHeaderToken, async (req, res) => {
  const { id } = req.params;
  const allTalkers = await getAllTalkers();
  console.log(allTalkers);
  const talkerIndex = allTalkers.findIndex((talker) => talker.id === parseInt(id, 10));

  await allTalkers.splice(talkerIndex, 1);
  writeUpdatedTalkers(allTalkers);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = talkerRouter;