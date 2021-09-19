const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const TALKER_FILE = 'talker.json';
const authToken = require('../middlewares/auth-token');
const { 
  nameAuth,
  ageAuth,
  watchedAtAuth,
  rateAuth,
  talkAuth, 
} = require('../middlewares/auth-talker');

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

// --- Requisito 4 ---
router.post(
  '/', 
  authToken,
  nameAuth,
  ageAuth,
  talkAuth,
  watchedAtAuth,
  rateAuth,
  (req, res) => {
    readTalkerFile()
    .then((data) => {
      const talkers = data;
      const newTalker = {
        id: talkers.length + 1,
        ...req.body,
      };

      talkers.push(newTalker);

      fs.writeFile('./talker.json', JSON.stringify(talkers));

      res.status(201).json({ ...newTalker });
    });
  },
);

// --- Requisito 5 ---
router.put(
  '/:id', 
  authToken,
  nameAuth,
  ageAuth,
  talkAuth,
  watchedAtAuth,
  rateAuth,
  (req, res) => {
    const { id } = req.params;
    readTalkerFile()
      .then((data) => {
        const talkers = data;
        const talkerById = talkers.find((talker) => talker.id === parseInt(id, 10));
        
        if (!talkerById) {
          return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        }
        const talkerArrayIndex = talkers.indexOf(talkerById);
        
        const newTalker = { id: talkerById.id, ...req.body };

        talkers[talkerArrayIndex] = newTalker;
        fs.writeFile('./talker.json', JSON.stringify(talkers));
        res.status(200).json({ ...newTalker });
      });
  },
);

router.delete(
  '/:id',
  authToken,
  (req, res) => {
    const { id } = req.params;
    readTalkerFile()
      .then((data) => {
        const talkers = data;
        const talkerById = talkers.find((talker) => talker.id === parseInt(id, 10));
        
        if (!talkerById) {
          return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        }

        const newTalkers = talkers.filter((talker) => talker !== talkerById);
        fs.writeFile('./talker.json', JSON.stringify(newTalkers));

        res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
      });
  },
);

module.exports = router;