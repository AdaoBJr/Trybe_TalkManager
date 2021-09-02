const express = require('express');

const {
  validateTalk,
  validateTalker,
  validateToken,
} = require('../Validation');

const {
  createTalker,
  deleteTalker,
  editTalker,
  getTalkersData,
  searchTalkerById,
  searchTalkerByName,
} = require('../Middlewares');

const talker = express.Router();

// Requisito 7
talker.get(
  '/search',
  validateToken,
  searchTalkerByName,
);

// Requisito 1
talker.get(
  '/',
  getTalkersData,
);

// Requisito 2
talker.get(
  '/:id',
  searchTalkerById,
);

// Requisito 4
talker.post(
  '/',
  validateToken,
  validateTalk,
  validateTalker,
  createTalker,
);

// Requisito 5
talker.put(
  '/:id',
  validateToken,
  validateTalk,
  validateTalker,
  editTalker,
);

// Requisito 6
talker.delete(
  '/:id',
  validateToken,
  deleteTalker,
);

module.exports = talker;
