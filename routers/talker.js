const fs = require('fs');
const express = require('express');

const { createTalker, updateTalker, deleteTalker } = require('./actions');
const {
  validateAge,
  validateTalk,
  validateName,
  validateRate,
  validateWatchedAt,
  validateToken,
} = require('./middlewares/validateTalker');

const router = express.Router();

router.get('/talker/search', validateToken, (req, res) => {
  const { q } = req.query;
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  if (!q) return res.status(200).json(talkers);

  const talkerByName = talkers.filter(({ name }) => name.includes(q));
  res.status(200).json(talkerByName);
});

router.get('/talker', (_req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

    res.status(200).json(talkers);
  } catch (err) {
    res.status(404).json({ Erro: err.message });
  }
});

router.get('/talker/:id', (req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
    const { id } = req.params;

    const talkerById = talkers.find((talker) => talker.id === +id);

    if (!talkerById) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }  
    res.status(200).json(talkerById);
  } catch (err) {
    res.status(404).json({ Erro: err.message });
  }
});

router.post('/talker',
  validateToken,
  validateAge,
  validateTalk,
  validateName,
  validateWatchedAt,
  validateRate,
  (req, res) => {
    const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
    const newId = talkers.length + 1;
    const newTalker = { id: newId, ...req.body };

    createTalker(newTalker);

    res.status(201).json(newTalker);
});

router.put('/talker/:id',
  validateToken,
  validateTalk,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  (req, res) => {
    const updatedTalker = { id: +req.params.id, ...req.body };

    updateTalker(updatedTalker);

    res.status(200).json(updatedTalker);
});

router.delete('/talker/:id', validateToken, (req, res) => {
  const { id } = req.params;
  deleteTalker(id);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;