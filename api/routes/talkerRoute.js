const express = require('express');
const {
  getAllTalkers,
  getTalkerById,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  addTalker,
  rateValidation,
  watchedAtValidation,
  editTalker,
} = require('../controllers/talkerControl');

const router = express.Router();

router.route('/')
  .get(getAllTalkers)
  .post(
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    rateValidation,
    watchedAtValidation,
    addTalker,
  );

router.route('/:id')
    .get(getTalkerById)
    .put(
      tokenValidation,
      nameValidation,
      ageValidation,
      talkValidation,
      rateValidation,
      watchedAtValidation,
      editTalker,
    );

module.exports = router;
