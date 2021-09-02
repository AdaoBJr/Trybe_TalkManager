const express = require('express');
const fs = require('fs');
const isAgeValid = require('../middlewares/isAgeValid');
const isNameValid = require('../middlewares/isNameValid');
const { isTalkExistent, isTalkValid, isTalkInfoExistent } = require('../middlewares/isTalkValid');
const isTokenValid = require('../middlewares/isTokenValid');

const router = express.Router();

const TALKER_DATA = 'talker.json';

router.get('/', (_req, res) => {
  try {
    const talkerData = fs.readFileSync(TALKER_DATA);
    res.status(200).json(JSON.parse(talkerData));
  } catch (err) {
    res.status(200).json(JSON.parse([]));
  }
});

router.get('/search', isTokenValid, (req, res) => {
  const { q } = req.query;
  const talkerData = JSON.parse(fs.readFileSync(TALKER_DATA));
  const searchResult = talkerData.filter((t) => t.name.includes(q));
  if (!q || searchResult.length === 0) {
    res.status(200).json(talkerData);
  }

  res.status(200).json(searchResult);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkerData = JSON.parse(fs.readFileSync(TALKER_DATA));
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
    const currentList = JSON.parse(fs.readFileSync(TALKER_DATA));
    const id = currentList.length + 1;
    const newItem = { id, name, age, talk };
    const newList = currentList.concat(newItem);
    fs.writeFileSync(TALKER_DATA, JSON.stringify(newList));
    res.status(201).json(newItem);
  },
);

router.put(
  '/:id',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkExistent,
  isTalkInfoExistent,
  isTalkValid,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const talkersList = JSON.parse(fs.readFileSync(TALKER_DATA));
    const talkerSerched = talkersList.find((t) => t.id === Number(id));
    const talkerIndex = talkersList.indexOf(talkerSerched);
    talkersList[talkerIndex] = { id: Number(id), name, age, talk };

    const newList = talkersList[talkerIndex];

    fs.writeFileSync(TALKER_DATA, JSON.stringify([newList]));

    res.status(200).json(newList);
  },
);

router.delete('/:id', isTokenValid, (req, res) => {
  const { id } = req.params;
  const talkerData = JSON.parse(fs.readFileSync(TALKER_DATA));
  const delIndex = talkerData.findIndex((t) => t.id === Number(id));

  talkerData.splice(delIndex, 1);
  fs.writeFileSync(TALKER_DATA, JSON.stringify(talkerData));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
