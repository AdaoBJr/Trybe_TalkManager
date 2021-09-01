const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const TALKER_FILE = 'talker.json';

function readTalkerFile() {
  return fs.readFile(TALKER_FILE, 'utf-8').then((data) => JSON.parse(data)); // Info vem em formato de string  
}

// --- Requisito 1 ---
router.get('/', (_req, res) => {
  readTalkerFile()
    .then((data) => {
      res.status(200).json(data);
    });
});

// --- Requisito 2 ---
router.get('/:id', (req, res) => {
  const { id } = req.params;
  readTalkerFile()
    .then((data) => {
      const talkerById = data.find((talker) => talker.id === parseInt(id, 10));
      if (!talkerById) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }

      res.status(200).json(talkerById);
    });
});

module.exports = router;