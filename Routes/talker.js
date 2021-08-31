const express = require('express');
const { getAll, findById } = require('../service/readLine');

const router = express.Router();

router.get('/talker', (req, res) => {
    const talkersList = getAll();
  res.status(200).send(talkersList);
});

router.get('/talker/:id', (req, res) => {
    const { id } = req.params;
    if (!findById(id)) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(findById(id));
});

module.exports = router;
