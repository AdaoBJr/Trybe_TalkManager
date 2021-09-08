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
  deleteValid, 
} = require('../middlewares/index');

router.get('/', getAll);

router.get('/:id', getFilterId);

router.post('/', tokenValid, nameValid, ageValid, talkValid, watchedAtValid, rateValid, postTalker);

router.put('/:id', tokenValid, nameValid, ageValid, talkValid, rateValid, watchedAtValid, putValid);

router.delete('/:id', tokenValid, deleteValid);

module.exports = router;
