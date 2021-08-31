const express = require('express');

const router = express.Router();
const { getAllTalkers, getTalker } = require('../controllers/talkerController');

router.route('/').get(getAllTalkers);

router.route('/:id').get(getTalker);

module.exports = router;
