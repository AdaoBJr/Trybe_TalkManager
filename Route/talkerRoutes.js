const express = require('express');
const utils = require('../utils');

const router = express.Router();
const HTTP_OK_STATUS = 200;

router.get('/', async (req, res) => {
  const fileContent = await utils.readFile('./talker.json');
  return res.status(HTTP_OK_STATUS).json(fileContent);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await utils.readFile('./talker.json');
  const talker = talkers.find((el) => el.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

module.exports = router;
