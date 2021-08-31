const express = require('express');
const { readFile } = require('./middlewares');
const { readFileId } = require('./middlewares');

const router = express.Router();

router.get('/', readFile);

router.get('/:id', readFileId);

module.exports = router;
