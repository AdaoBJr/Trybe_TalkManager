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

router.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (!talkers) {
    return res.status(200).json([]);
  }
    return res.status(200).json(talkers);
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
    criarNovoPalestrante(editTalker);
   res.status(200).json(editTalker[talkerIndex]);
});

module.exports = router;
