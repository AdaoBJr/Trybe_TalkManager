const express = require('express');

const talkers = express.Router();

const {
  findOne,
  validaToken,
  editTalker,
  validaNome,
  validaAge,
  seachTalker,
  validaDate,
  validaRate,
  validaTalk,
  addTalker,
  deletaTalker,
} = require('../middlewares');

const {
  readFile,
} = require('../utils/talkers');

talkers.get('/search',
  validaToken,
  seachTalker);

talkers.get('/', async (_req, res) => {
  const talk = await readFile();
  return res.status(200).json(talk);
});

// ALTERAR!
talkers.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talk = await readFile();
  const talkerFind = findOne(id, talk);
  if (talkerFind) {
    return res.status(200).json(talkerFind);
  }
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

talkers.use(validaToken);

talkers.delete('/:id', deletaTalker);

talkers.use(validaNome, validaAge, validaTalk, validaDate, validaRate);

talkers.post('/', addTalker);

talkers.put('/:id', editTalker);

module.exports = talkers;