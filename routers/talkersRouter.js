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
} = require('../middlewares/index');

router.get('/', getAll);

router.get('/:id', getFilterId);

router.post('/', tokenValid, nameValid, ageValid, watchedAtValid, rateValid, postTalker);

module.exports = router;
