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

module.exports = router;