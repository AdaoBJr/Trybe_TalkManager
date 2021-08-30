const express = require('express');
const { getAllTalker } = require('./controllers');

const router = express.Router();

router.route('/')
  .get(getAllTalker);

// router.route('/:id')
//   .get();

module.exports = router;