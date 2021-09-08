const express = require('express');

const router = express.Router();

const { 
  getAll,
  getFilterId,
  tokenValid,
  nameValid,
  ageValid,
  watchedAtValid,
  rateValid,
  postTalker,
  talkValid,
  putValid, 
} = require('../middlewares/index');

router.get('/', getAll);

router.get('/:id', getFilterId);

router.post('/', tokenValid, nameValid, ageValid, talkValid, watchedAtValid, rateValid, postTalker);

router.put('/:id', tokenValid, nameValid, ageValid, talkValid, rateValid, watchedAtValid, putValid);

module.exports = router;
