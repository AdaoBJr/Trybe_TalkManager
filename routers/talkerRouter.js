const express = require('express');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middleware/validationMiddleware');
const {
  searchTerm,
  deleteTalker,
  editTalker,
  createTalker,
  getTalkers,
  getTalkerById,
} = require('../helper/auxiliaryFunctions');

const router = express.Router();

router.get('/search', validateToken, searchTerm);

router.get('/:id', getTalkerById);

router.get('/', getTalkers);

router.post('/',
  validateTalk,
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  createTalker);

  router.put('/:id',
  validateTalk,
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  editTalker);

  router.delete('/:id', validateToken, deleteTalker);

module.exports = router;
