const express = require('express');

const router = express.Router();

// const tokenValidation = require('../auxiliar_functions/validations/tokenValidation');
// const nameValidation = require('../auxiliar_functions/validations/nameValidation');
// const ageValidation = require('../auxiliar_functions/validations/ageValidation');
// const talkValidation = require('../auxiliar_functions/validations/talkValidation');
// const dateValidation = require('../auxiliar_functions/validations/dateValidation');
// const rateValidation = require('../auxiliar_functions/validations/rateValidation');

const getAllTalkers = require('../middleweres/talkers/getAllTalkers');
const getTalkerById = require('../middleweres/talkers/getTalkerById');
// const registerNewTalker = require('../middleweres/talkers/registerNewTalker');

router.route('/:id')
  .get(getTalkerById);

router.route('/')
  .get(getAllTalkers);
  // .post(
  //   tokenValidation,
  //   nameValidation,
  //   ageValidation,
  //   talkValidation,
  //   dateValidation,
  //   rateValidation,
  //   registerNewTalker,
  // );

module.exports = router;
