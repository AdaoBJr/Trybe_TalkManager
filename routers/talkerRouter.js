const express = require('express');
const rescue = require('express-rescue');

const talk = express.Router();
const { getTalkers, putTalkers } = require('../services/fileManager');
const { validateToken, validateNameAge, validateTalk, validateDateRate,
} = require('../auth/authPost');

talk.route('/search')
  .get(validateToken, rescue(async (req, res) => {
    const { q } = req.query;
    const talkers = await getTalkers();

    if (!q || q === '') return res.status(200).json(talkers);

    const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
    return !filteredTalkers
      ? res.status(200).json([])
      : res.status(200).json(filteredTalkers);
  }));

talk.route('/:id')
  .get(rescue(async (req, res) => {
    const talkers = await getTalkers();
    const { id } = req.params;
    const talker = talkers.find((t) => t.id === Number(id));

    return !talker
      ? res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
      : res.status(200).json(talker);
  }))
  .put(validateToken, validateNameAge, validateTalk, validateDateRate, rescue(async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
    if (talkerIndex < 0) return res.status(404).json({ message: 'talker not found' });
    talkers[talkerIndex] = { ...talkers[talkerIndex], ...req.body };
    await putTalkers(talkers);
    res.status(200).json(talkers[talkerIndex]);
  }))
  .delete(validateToken, rescue(async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
    if (talkerIndex < 0) return res.status(404).json({ message: 'talker not found' });
    talkers.splice(talkerIndex, 1);
    await putTalkers(talkers);
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' }).end();
  }));

talk.route('/')
  .get(rescue(async (_req, res) => {
    const talkers = await getTalkers();
    return talkers.length === 0
      ? res.status(200).json([])
      : res.status(200).json(talkers);
  }))
  .post(validateToken, validateNameAge, validateTalk, validateDateRate, rescue(async (req, res) => {
    const talkers = await getTalkers();
    const autoId = talkers.length > 0 ? talkers[talkers.length - 1].id + 1 : 1;
    const newTalk = { id: autoId, ...req.body };
    talkers.push(newTalk);
    await putTalkers(talkers);
    res.status(201).json(newTalk);
  }));

module.exports = talk;
