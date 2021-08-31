const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const arquivo = './talker.json';

router.get('/', (_req, res) => {
  let data = [];
  fs.readFile(arquivo, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    data = info;
    return res.status(200).json(data);
  })
.catch((err) => { res.status(400).json(err); });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(arquivo, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    const filtered = info.find((item) => item.id === Number(id));
    if (!filtered) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(filtered);
  });
});
module.exports = router;
