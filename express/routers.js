const express = require('express');
const { 
  getAllTalker, 
  getTalker, 
  validateToken, 
  validateName, 
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  createTalker,
  editTalker,
} = require('./controllers');

const router = express.Router();

router.route('/')
  .get(getAllTalker)
  .post(
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
    createTalker,
    );

router.route('/:id')
  .get(getTalker)
  .put(
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
    editTalker,
  );

module.exports = router;
