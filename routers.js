const express = require('express');

const router = express.Router();

const crypto = require('crypto');

const {
  getAllTalkers,
  criarNovoPalestrante,
  verifyname,
  verifyToken,
  verifyAge,
  verifyFieldsTalk,
  verifyDate,
  verifyRate,
} = require('./requirements/validations');

router.get('/talker/search',
verifyToken, async (req, res) => {
const { q } = req.query;
const talker = await getAllTalkers();
if (!q)res.status(200).json(talker);
const filterTalkers = talker.filter((t) => t.name.includes(q));
res.status(200).json(filterTalkers);
});

router.get('/talker/:id', async (req, res) => {
  const talkers = await getAllTalkers();
  const { id } = req.params;
  const getId = talkers.find((talkerId) => talkerId.id === parseInt(id, 10));
  if (!getId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
    return res.status(200).json(getId);
});

router.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (!talkers) {
    return res.status(200).json([]);
  }
    return res.status(200).json(talkers);
});

router.post('/talker',
verifyname,
verifyToken,
verifyAge,
verifyFieldsTalk,
verifyDate,
verifyRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const palestrantes = await getAllTalkers();
  const id = palestrantes.length + 1;
  const novoPalestrante = { id, name, age, talk };
  palestrantes.push(novoPalestrante);
  criarNovoPalestrante(palestrantes);
  return res.status(201).json(novoPalestrante);
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  const emailValidate = emailRegex.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidate) {
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
});

router.put('/talker/:id',
verifyToken,
verifyname,
verifyAge,
verifyFieldsTalk,
verifyDate,
verifyRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const editTalker = await getAllTalkers();
  const talkerIndex = editTalker.findIndex((talker) => talker.id === parseInt(id, 10));
    if (talkerIndex === -1) return res.status(400).json({ message: 'Talker not found!' });
    editTalker[talkerIndex] = { ...editTalker[talkerIndex], name, age, talk: { watchedAt, rate } };
    await criarNovoPalestrante(editTalker);
   res.status(200).json(editTalker[talkerIndex]);
});

router.delete('/talker/:id',
verifyToken, async (req, res) => {
const { id } = req.params;
const talker = await getAllTalkers();
const deleteTalker = talker.findIndex((t) => t.id === parseInt(id, 10));
if (deleteTalker === -1) return res.status(404).json({ message: 'Talker not found!' });
talker.splice(deleteTalker, 1);
criarNovoPalestrante(talker);
res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
