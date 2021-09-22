const { Router } = require('express');
const addTalker = require('../middlewares/addTalker');
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
  validateAge,
  validateName,
  validateRate,
  validateTalk,
  validateToken,
  validateWatchedAt];

const router = Router();

router.get('/', getAllTalkers);
router.get('/:id', getTalkerById);
router.post('/', ...addValidation, addTalker);
module.exports = router;
