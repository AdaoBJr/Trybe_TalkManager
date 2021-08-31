const express = require('express');
const fs = require('fs').promises;
const { token } = require('./funcoes');
const {
  validatePassWord,
  validationEmail,
  validationToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalk2,
} = require('./validations');

const router = express.Router();
const talker = require('./talker');

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await talker();
  console.log(result);

  const filterId = result.find((pessoa) => pessoa.id === Number(id));
  if (!filterId) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  res.status(200).json(filterId);
});

router.get('/talker', async (req, res) => {
  const result = await talker();
  if (result.length === 0) {
    return res.status(200).json([]);
  }
  res.status(200).json(result);
});

router.post('/talker', validationToken,
validateName,
validateAge,
validateTalk2,
validateTalk, async (req, res) => {
  const { name, age } = req.body;
  const { watchedAt, rate } = req.body.talk;
  const oldTalk = await talker();
  const newId = oldTalk.length + 1;
  const newParticipate = { id: newId, name, age, talk: { watchedAt, rate } };
  fs.writeFile('./talker.json', JSON.stringify([...oldTalk, newParticipate]));

  res.status(201).json(newParticipate);
});

router.put('/talker/:id',
validationToken,
validateName,
validateAge,
validateTalk2,
validateTalk, async (req, res) => {
  const { id } = req.params;
  const arrayTalkers = await talker();
  const { name, age } = req.body;
  const { watchedAt, rate } = req.body.talk;
  const fildPalestrant = arrayTalkers.findIndex(((people) => people.id === Number(id)));
  const filterid = arrayTalkers.filter((e) => e.id !== Number(id));
  const newObj = { ...arrayTalkers[fildPalestrant], name, age, talk: { watchedAt, rate } };
  fs.writeFile('./talker.json', JSON.stringify([...filterid, newObj]));
  console.log([...filterid, newObj]);
  res.status(200).json(newObj);
});

router.post('/login', validationEmail, validatePassWord, (req, res) =>
res.status(200).json({ token }));

module.exports = router;