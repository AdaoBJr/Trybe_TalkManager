const express = require('express');
const { getAllTalker, getTalker } = require('./controllers');

const router = express.Router();

router.route('/')
  .get(getAllTalker);

router.route('/:id')
  .get(getTalker);

module.exports = router;