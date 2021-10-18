const express = require('express');
const { tokenMiddleware, validateEmail, validatePassword } = require('./middlewaresLogin');

const router = express.Router();

router.post('/', tokenMiddleware, validateEmail, validatePassword);

module.exports = router;
