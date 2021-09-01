const fs = require('fs');
const express = require('express');
const isValidToken = require('../middlewares/isValidToken');
const isValidName = require('../middlewares/isValidName');
const isValidAge = require('../middlewares/isValidAge');
const isValidDate = require('../middlewares/isValidDate');
const isValidRate = require('../middlewares/isValidRate');
const isValidTalk = require('../middlewares/isValidTalk');

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const data = fs.readFileSync('./talker.json', 'utf8');
    const talkers = JSON.parse(data);
    
    res.status(200).json(talkers);
  } catch (err) {
    res.status(404).json({ Erro: err.message });
  }
});

router.get('/:id', (req, res) => {
  const idParam = req.params.id;
  const data = fs.readFileSync('./talker.json', 'utf8');
  const talkers = JSON.parse(data);

  const talkerFound = talkers.find(({ id }) => Number(id) === Number(idParam));

  if (talkerFound === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  res.status(200).json(talkerFound);
});

router.post('/', isValidToken, isValidTalk, isValidName, isValidAge, isValidDate, isValidRate,
(req, res) => {
  const data = fs.readFileSync('./talker.json', 'utf8');
  const talkers = JSON.parse(data);
  const { name, age, talk: { watchedAt, rate } } = req.body;
  
  const qtdTalks = talkers.length;
  talkers.push({ id: qtdTalks + 1, name, age, talk: { watchedAt, rate } });

  try {
    const talkerString = JSON.stringify(talkers);
    fs.writeFileSync('./talker.json', talkerString);
    res.status(201).json({ id: qtdTalks + 1, name, age, talk: { watchedAt, rate } });
  } catch (err) {
    res.status(501).json({ Err: err.message });
  }
});

module.exports = router;
