const express = require('express');
const fs = require('fs').promises;
const { findById, create, lastId } = require('../service/readLine');
const { update, excluse } = require('../service/readLine');
const { authLogin, validateTalker } = require('../middlewares');

const router = express.Router();

router.get('/talker/search', authLogin, async (req, res) => {
  const { q } = req.query;
  const resultFs = await fs.readFile('./talker.json', 'utf8');
  const talkers = JSON.parse(resultFs);
  if (!q) {
    const talkerResult = talkers.filter(({ name }) => RegExp(q, 'gi').test(name));
    res.status(200).json(talkerResult);
  }
  res.status(200).json(talkers);
});

router.get('/talker', async (req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  res.status(200).json(JSON.parse(data));
});

router.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = findById(id);
  if (!talker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
});

router.use('/talker', authLogin);

router.post('/talker', validateTalker, (req, res) => {
  const { ...newTalker } = { id: lastId, ...req.body };
  create(newTalker);
  res.status(201).json(newTalker);
});

router.put('/talker/:id', validateTalker, (req, res) => {
  const { ...updateTalker } = { id: +req.params.id, ...req.body };
  update(updateTalker);
  res.status(200).json(updateTalker);
});

router.delete('/talker/:id', (req, res) => {
  const { id } = req.params;
  excluse(id);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
