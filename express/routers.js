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
  deleteTalker,
  searchTalker,
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

router.route('/search')
  .get(validateToken, searchTalker);
  
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
  )
  .delete(validateToken, deleteTalker);

module.exports = router;
