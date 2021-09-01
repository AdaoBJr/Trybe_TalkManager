const express = require('express');
const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  addTalker,
  getTalkerById,
  getAllTalkers,
  rateValidation,
  watchedAtValidation,
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
      (_req, res) => {
        res.status(200).send('Tudo certo');
      },
    );

module.exports = router;
