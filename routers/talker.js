const express = require('express');
// const talker = require('../talker.json');

const { readFile } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await readFile();
  if (!result) {
  return res.status(200).json([]);
  }
  return res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFile();
  const palestrante = result.find((elem) => elem.id === Number(id));
  if (!palestrante) {
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
  }
  res.status(200).json(palestrante);
});

module.exports = router;