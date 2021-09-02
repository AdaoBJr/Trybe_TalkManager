const express = require('express');
const fs = require('fs');

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
    fs.writeFileSync('./talker.json', JSON.stringify(talkers));

    res.status(201).json(newTalker);
  },
);

module.exports = router;
