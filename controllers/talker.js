const express = require('express');
const { getAll, findById, create } = require('../services/talker');
const { update, findByName, excluse } = require('../services/talker');
const { authLogin, validateTalker } = require('../middlewares');
const { validateTalker2, validateTalker3 } = require('../middlewares');

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

router.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  await excluse(id);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.use(validateTalker);
router.use(validateTalker2);
router.use(validateTalker3);

router.post('/talker', async (req, res) => {
  const talker = await create(req.body);
  console.log(talker);
  res.status(201).json(talker);
});

router.put('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await update(id, req.body);
  res.status(200).json(talker);
});

module.exports = router;
