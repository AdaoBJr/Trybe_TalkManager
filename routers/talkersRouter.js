const express = require('express');

const router = express.Router();

const { getAll } = require('../middlewares/getAllTalkers');
const { getFilterId } = require('../middlewares/getTalkerById');
const { tokenValid } = require('../middlewares/tokemValid');
const { postTalker } = require('../middlewares/createTalker');
const { putValid } = require('../middlewares/editTalker');
const { deleteValid } = require('../middlewares/deleteTalker');
const { searchTalker } = require('../middlewares/searchTalker');
const { 
  nameValid, 
  ageValid, 
  watchedAtValid, 
  rateValid,
  talkValid, 
} = require('../middlewares/newEditDelete');

router.get('/search', tokenValid, searchTalker);

router.get('/', getAll);

router.get('/:id', getFilterId);

router.post('/', tokenValid, nameValid, ageValid, talkValid, watchedAtValid, rateValid, postTalker);

router.put('/:id', tokenValid, nameValid, ageValid, talkValid, rateValid, watchedAtValid, putValid);

router.delete('/:id', tokenValid, deleteValid);

module.exports = router;
