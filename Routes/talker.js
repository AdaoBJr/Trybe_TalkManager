const express = require('express');
const { getAll, findById, create, lastId, update } = require('../service/readLine');
const { authLogin, validateTalker } = require('../middlewares');

const router = express.Router();

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

module.exports = router;
