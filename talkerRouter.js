const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const { getTalkers, getTalkerById } = require('./middlewares');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
} = require('./validations');

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

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await getTalkers();
    const id = talkers.length + 1;
    const newTalker = { id, name, age, talk };
    talkers.push(newTalker);
    fs.writeFile('./talker.json', JSON.stringify(talkers));

    res.status(201).json(newTalker);
  },
);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await getTalkers();
    const talkerIndex = talkers.findIndex((r) => r.id === parseInt(id, 10));

    talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
    fs.writeFile('./talker.json', JSON.stringify(talkers));
    res.status(200).json(talkers[talkerIndex]);    
  },
);

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talkerIndex = talkers.findIndex((r) => r.id === parseInt(id, 10));

  talkers.splice(talkerIndex, 1);

  fs.writeFile('./talker.json', JSON.stringify(talkers));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });  
});

module.exports = router;
