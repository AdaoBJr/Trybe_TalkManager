const express = require('express');
const { readFile } = require('./middlewares');
const { readFileId } = require('./middlewares');
const { tokenMiddleware } = require('./middlewares');
const { validateEmail } = require('./middlewares');
const { validatePassword } = require('./middlewares');

const router = express.Router();

router.get('/', readFile);

router.get('/:id', readFileId);

router.post('/', tokenMiddleware, validateEmail, validatePassword);

module.exports = router;
