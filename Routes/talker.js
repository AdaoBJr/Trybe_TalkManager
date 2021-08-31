const express = require('express');
const { getAll, findById, create } = require('../service/readLine');
const { update, findByName, excluse } = require('../service/readLine');
const { authLogin, validateTalker } = require('../middlewares');

const router = express.Router();

router.get('/talker/search', authLogin, async (req, res) => {
  const { q: param } = req.query;
  const talkers = await getAll();
  if (!param) res.status(200).json(talkers);
  const talkerResult = await findByName(param);
  res.status(200).json(talkerResult);
});

router.get('/talker', async (req, res) => {
  const data = await getAll();
  res.status(200).json(data);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await findById(id);
  if (!talker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
});

router.use('/talker', authLogin);

router.post('/talker', validateTalker, async (req, res) => {
  const data = await getAll();
  const id = data.length + 1;
  const { ...newTalker } = { id, ...req.body };
  await create(newTalker);
  res.status(201).json(newTalker);
});

router.put('/talker/:id', validateTalker, async (req, res) => {
  const { ...updateTalker } = { id: +req.params.id, ...req.body };
  await update(updateTalker);
  res.status(200).json(updateTalker);
});

router.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  await excluse(id);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
