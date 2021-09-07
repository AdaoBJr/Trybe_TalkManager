const fs = require('fs');
const express = require('express');

const router = express.Router();

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

module.exports = router;