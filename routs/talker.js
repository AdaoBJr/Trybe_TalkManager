const fs = require('fs');
const express = require('express');
const isValidToken = require('../middlewares/isValidToken');
const isValidName = require('../middlewares/isValidName');
const isValidAge = require('../middlewares/isValidAge');
const isValidDate = require('../middlewares/isValidDate');
const isValidRate = require('../middlewares/isValidRate');
const isValidTalk = require('../middlewares/isValidTalk');

const router = express.Router();

const fileData = './talker.json';

router.get('/', (_req, res) => {
  try {
    const data = fs.readFileSync(fileData, 'utf8');
    const talkers = JSON.parse(data);
    
    res.status(200).json(talkers);
  } catch (err) {
    res.status(404).json({ Erro: err.message });
  }
});

router.get('/:id', (req, res) => {
  const idParam = req.params.id;
  const data = fs.readFileSync(fileData, 'utf8');
  const talkers = JSON.parse(data);

  const talkerFound = talkers.find(({ id }) => Number(id) === Number(idParam));

  if (talkerFound === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  res.status(200).json(talkerFound);
});

router.post('/', isValidToken, isValidTalk, isValidName, isValidAge, isValidDate, isValidRate,
(req, res) => {
  const data = fs.readFileSync(fileData, 'utf8');
  const talkers = JSON.parse(data);
  const { name, age, talk: { watchedAt, rate } } = req.body;
  
  const qtdTalks = talkers.length;
  talkers.push({ id: qtdTalks + 1, name, age, talk: { watchedAt, rate } });

  try {
    const talkerString = JSON.stringify(talkers);
    fs.writeFileSync(fileData, talkerString);
    res.status(201).json({ id: qtdTalks + 1, name, age, talk: { watchedAt, rate } });
  } catch (err) {
    res.status(501).json({ Erro: err.message });
  }
});

router.put('/:id', isValidToken, isValidTalk, isValidName, isValidAge, isValidDate, isValidRate,
(req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  try {
    const data = fs.readFileSync(fileData, 'utf8');
    const talkers = JSON.parse(data);
    const indexTalker = talkers.findIndex((t) => Number(t.id) === Number(id));
  
    talkers[indexTalker] = {
      ...talkers[indexTalker], name, age, talk: { watchedAt, rate },
    };
  
    const talkerString = JSON.stringify(talkers);
    fs.writeFileSync(fileData, talkerString);
  
    res.status(200).json(talkers[indexTalker]);
  } catch (err) {
    res.status(501).json({ Erro: err.message });
  }
});

router.delete('/:id', isValidToken, (req, res) => {
  const { id } = req.params;

  try {
    const data = fs.readFileSync(fileData, 'utf8');
    const talkers = JSON.parse(data);
    const indexTalker = talkers.findIndex((t) => Number(t.id) === Number(id));
    if (indexTalker === -1) return res.status(404).json({ message: 'talker not found!' });
    
    talkers.splice(indexTalker, 1);
    const talkerString = JSON.stringify(talkers);
    fs.writeFileSync(fileData, talkerString);
  
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    res.status(501).json({ Erro: err.message });
  }
});

module.exports = router;
