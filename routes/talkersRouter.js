const express = require('express');
const fs = require('fs');
const isAgeValid = require('../middlewares/isAgeValid');
const isNameValid = require('../middlewares/isNameValid');
const { isTalkExistent, isTalkValid, isTalkInfoExistent } = require('../middlewares/isTalkValid');
const isTokenValid = require('../middlewares/isTokenValid');

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const talkerData = fs.readFileSync('talker.json');
    res.status(200).json(JSON.parse(talkerData));
  } catch (err) {
    res.status(200).json(JSON.parse([]));
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkerData = JSON.parse(fs.readFileSync('talker.json'));
  const talker = talkerData.find((t) => t.id === Number(id));
  if (!talker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(talker);
});

router.post(
  '/',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkExistent,
  isTalkInfoExistent,
  isTalkValid,
  (req, res) => {
    const { name, age, talk } = req.body;
    const id = JSON.parse(fs.readFileSync('talker.json')).length + 1;
    const newList = { id, name, age, talk };
    fs.writeFileSync('talker.json', JSON.stringify([newList]));
    res.status(201).json(newList);
  },
);

module.exports = router;
