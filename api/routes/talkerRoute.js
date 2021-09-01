const express = require('express');
const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtRateValidation,
  addTalker,
  getTalkerById,
  getAllTalkers,
} = require('../controllers/talkerControl');

const router = express.Router();

router.route('/')
  .get(getAllTalkers)
  .post(
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    watchedAtRateValidation,
    addTalker,
  );

router.route('/:id')
    .get(getTalkerById);

module.exports = router;
