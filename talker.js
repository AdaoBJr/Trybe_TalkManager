const fs = require('fs');
const express = require('express');

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

module.exports = router;
