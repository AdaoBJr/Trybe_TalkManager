const express = require('express');
const { getAll, findById, create, lastId } = require('../service/readLine');
const { update, excluse, findByName } = require('../service/readLine');
const { authLogin, validateTalker } = require('../middlewares');

const router = express.Router();

router.get('/talker/search', authLogin, (req, res) => {
  const { q } = req.query;
  const talkers = getAll();
  if (!q) res.status(200).json([]);
  const talkerResult = findByName(q);
  if (!talkerResult) res.status(200).json(talkers);
  res.status(200).json(talkerResult);
});

router.get('/talker', (req, res) => {
  const talkersList = getAll();
  res.status(200).send(talkersList);
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
