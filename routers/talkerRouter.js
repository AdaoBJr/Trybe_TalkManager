const express = require('express');

const talk = express.Router();
const { getTalkers, putTalkers } = require('../services/fileManager');
const {
  validateToken,
  validateNameAge,
  validateTalk,
  validateDateRate,
} = require('../auth/authPost');

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

talk.route('/:id')
  .get(async (req, res) => {
    const talkers = await getTalkers();
    const { id } = req.params;
    const talker = talkers.find((t) => t.id === Number(id));

    return !talker
    ? res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
    : res.status(200).json(talker);
  })
  .put(validateToken, validateNameAge, validateTalk, validateDateRate, async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
    if (talkerIndex < 0) return res.status(404).json({ message: 'talker not found' });
    talkers[talkerIndex] = { ...talkers[talkerIndex], ...req.body };
    putTalkers(talkers);
    res.status(200).json(talkers[talkerIndex]);
  })
  .delete(validateToken, async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
    if (talkerIndex < 0) return res.status(404).json({ message: 'talker not found' });
    talkers.splice(talkerIndex, 1);
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' }).end();
  });

module.exports = talk;
