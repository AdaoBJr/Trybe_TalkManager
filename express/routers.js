const express = require('express');
const { getAllTalker, getTalker } = require('./controllers');

const router = express.Router();

router.route('/')
  .get(getAllTalker)
  .post();

router.route('/:id')
  .get(getTalker);

module.exports = router;