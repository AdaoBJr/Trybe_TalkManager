const { Router } = require('express');
const addTalker = require('../middlewares/addTalker');
const editTalker = require('../middlewares/editTalker');
const deleteTalker = require('../middlewares/deleteTalker');
const getAllTalkers = require('../middlewares/getAllTalkers');
const getTalkerById = require('../middlewares/getTalkerById');
const {
  validateAge,
  validateName,
  validateRate,
  validateTalk,
  validateToken,
  validateWatchedAt,
} = require('../middlewares/index.js');

const addValidation = [
  validateToken,
  validateAge,
  validateName,
  validateTalk,
  validateRate,
  validateWatchedAt,
];

const router = Router();

router.get('/', getAllTalkers);
router.get('/:id', getTalkerById);
router.post('/', ...addValidation, addTalker);
router.put('/:id', ...addValidation, editTalker);
router.delete('/:id', validateToken, deleteTalker);
module.exports = router;
