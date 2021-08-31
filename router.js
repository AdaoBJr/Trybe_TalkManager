const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const pathTalker = './talker.json';

const {
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
} = require('./validations');

const router = express.Router();

router.get('/talker', (_req, res) => {
  const talkers = fs.readFileSync(pathTalker, 'utf8');

  if (!talkers) return res.status(200).json([]);

  return res.status(200).json(JSON.parse(talkers));
});

router.get(
  '/talker/search',
  verifyToken,
  (req, res) => {
    const { q } = req.query;
    const talkers = JSON.parse(fs.readFileSync(pathTalker, 'utf8'));
    if (!q) return res.status(200).json(talkers);
    const selectedTalkers = talkers.filter((talker) => talker.name.includes(q));
    return res.status(200).json(selectedTalkers);
  },
);

router.get('/talker/:id', (req, res) => {
  const { id } = req.params;

  const talkers = JSON.parse(fs.readFileSync(pathTalker, 'utf8'));
  const talker = talkers.find((curr) => curr.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const re = /\S+@\S+\.\S+/;
  const isValid = re.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isValid) {
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

router.post(
  '/talker',
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyRate,
  verifyWatchedAt,
  (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = JSON.parse(fs.readFileSync(pathTalker, 'utf8'));
    const id = talkers.length + 1;
    const newTalker = { id, name, age, talk };
    talkers.push(newTalker);
    console.log(talkers);
    fs.writeFileSync(pathTalker, JSON.stringify(talkers));
    return res.status(201).json(newTalker);
  },
);

router.put(
  '/talker/:id',
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyRate,
  verifyWatchedAt,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = JSON.parse(fs.readFileSync(pathTalker, 'utf8'));
    let ind = 0;
    talkers.forEach((talker, index) => {
      if (talker.id === parseInt(id, 10)) {
        talkers[index].name = name;
        talkers[index].age = age;
        talkers[index].talk = talk;
        ind = index;
      }
    });
    fs.writeFileSync(pathTalker, JSON.stringify(talkers));
    return res.status(200).json(talkers[ind]);
  },
);

router.delete(
  '/talker/:id',
  verifyToken,
  (req, res) => {
    const { id } = req.params;
    const talkers = JSON.parse(fs.readFileSync(pathTalker, 'utf8'));
    let ind = 0;
    talkers.forEach((talker, index) => {
      if (talker.id === parseInt(id, 10)) {
        ind = index;
      }
    });
    talkers.splice(ind, 1);
    fs.writeFileSync(pathTalker, JSON.stringify(talkers));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  },
);

module.exports = router;
