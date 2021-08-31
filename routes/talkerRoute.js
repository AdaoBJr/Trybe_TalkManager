const express = require('express');

const router = express.Router();
const { getAllTalkers } = require('../controllers/talkerController');

router.route('/').get(getAllTalkers);

module.exports = router;
