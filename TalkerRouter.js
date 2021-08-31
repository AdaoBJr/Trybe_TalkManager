const express = require('express');

const router = express.Router();
const { getTalkers } = require('./helpers');

const HTTP_OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  return res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talkerById = talkers.find((talker) => talker.id === Number(id));
  
  if (!talkerById) {
    return res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(talkerById);
});

module.exports = router;
