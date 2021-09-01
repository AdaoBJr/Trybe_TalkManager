const express = require('express');
const { tokenMiddleware } = require('./middlewaresLogin');
const { validateEmail } = require('./middlewaresLogin');
const { validatePassword } = require('./middlewaresLogin');

const router = express.Router();

router.post('/', tokenMiddleware, validateEmail, validatePassword);

module.exports = router;
