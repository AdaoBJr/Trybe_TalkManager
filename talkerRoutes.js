const express = require('express');
const { readTalkerFile } = require('./utils');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkers = readTalkerFile();

  const talkerFound = talkers.find((talker) => `${talker.id}` === id);

  if (!talkerFound) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(talkerFound);
});

router.get('/', (req, res) => {
  const talkers = readTalkerFile();
  return res.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = router;
