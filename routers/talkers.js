const express = require('express');

const talkers = express.Router();

const {
  findAll,
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

talkers.get('/search',
  validaToken,
  seachTalker);

talkers.get('/', findAll);

talkers.get('/:id', findOne);

talkers.use(validaToken);

talkers.delete('/:id', deletaTalker);

talkers.use(validaNome, validaAge, validaTalk, validaDate, validaRate);

talkers.post('/', addTalker);

talkers.put('/:id', editTalker);

module.exports = talkers;
