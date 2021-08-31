const express = require('express');
const readFile = require('./middlewares');

const router = express.Router();

router.get('/', readFile);

module.exports = router;
