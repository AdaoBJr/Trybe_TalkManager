const express = require('express');
const fs = require('fs').promises;
const {
  validateToken,
  validateNameAge,
  validateTalk,
  validateDateRate,
} = require('../auth/authPost');

const talk = express.Router();
const getTalkers = async () => JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
const putTalkers = (content) => fs.writeFile('./talker.json', JSON.stringify(content));

talk.route('/')
  .get(async (_req, res) => {
    const talkers = await getTalkers();
    return talkers.length === 0
    ? res.status(200).json([])
    : res.status(200).json(talkers);
  })
  .post(validateToken, validateNameAge, validateTalk, validateDateRate, async (req, res) => {
    const talkers = await getTalkers();
    const newTalk = { id: talkers[talkers.length - 1].id + 1, ...req.body };
    talkers.push(newTalk);
    putTalkers(talkers);
    res.status(201).json(newTalk);
  });

  talk.get('/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === Number(id));

  return !talker
  ? res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
  : res.status(200).json(talker);
});

module.exports = talk;
